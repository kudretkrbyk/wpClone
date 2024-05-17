const admin = require("firebase-admin");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const getPersons = require("./requests/getPersons");
const getFilteredPerson = require("./requests/getFilteredPerson");
const getMessages = require("./requests/getMessages");
const getOneUserMessages = require("./requests/getOneUserMessages");
const emitSelectedChatMessages = require("./functions/emitChatFunc");
const deleteChat = require("./requests/deleteChat");
const emitIncomingMessages = require("./functions/emitIncomingMessage");

const addMessages = require("./requests/addMessages");

let ChatId = "";
let globalSocket;
let newChatId;

const port = process.env.PORT || 3001;
const app = express();

// Socket.IO'yu HTTP sunucusuna bağlayın
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABASE_URL",
});

const db = admin.firestore();
let persons = [];
let socketFilteredMessages = [];
// İlk başta verileri alıyoruz
getPersons((getPersons) => {
  persons = getPersons;
});
let filterId = null; // Filtrelemek istediğiniz kullanıcının ID'si frontend den gelecek!
//const numericFilterId = Number(filterId);

//addMessages();

// Socket bağlantı olayını dinle

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");
  socket.on("senderId", async (idData) => {
    filterId = idData;
    console.log("filterid", filterId);
  });

  getMessages(
    (filteredMessages) => {
      socketFilteredMessages = filteredMessages;
      console.log("gelen mesajlar", filteredMessages);
      emitIncomingMessages(socket, socketFilteredMessages);
    },

    filterId
  );

  // Bağlı istemcilere mevcut kişileri gönder
  socket.emit("initialData", persons);
  socket.on("selectedChat", async (selectedChat) => {
    console.log("selectedChat spcketon geldi", selectedChat);
    ChatId = selectedChat; // selectedChat içinden UserId değerini alın
    getOneUserMessages((callback) => {
      let selectedChatMessages = callback;
      socket.emit("selectedChatMessages", selectedChatMessages);
    }, ChatId);

    await emitSelectedChatMessages(socket, ChatId);
  });

  //Database mesaj ekleme
  socket.on("sendingMessage", async (sendingMessageData) => {
    console.log("DB tarafına gelen gönderilecek mesajlar:", sendingMessageData);
    console.log(
      "DB tarafına gelen gönderilecek mesajlar:",
      sendingMessageData.ChatId
    );
    const newChatId = sendingMessageData.ChatId; // Yeni bir chat ID al

    // addMessages fonksiyonunu çağırın ve içinde getOneUserMessages fonksiyonunu çağırın
    addMessages(
      (callback) => {
        getMessages((filteredMessages) => {
          socketFilteredMessages = filteredMessages;
          emitIncomingMessages(socket, socketFilteredMessages);
        }, filterId);
        getOneUserMessages((newMessages) => {
          let selectedNewChatMessages = newMessages;
          console.log("gom server", selectedNewChatMessages);
          socket.emit("newChatMessages", selectedNewChatMessages);
        }, newChatId);
      },
      filterId,
      sendingMessageData
    );
  });

  socket.on("selectedChat", async (selectedChat) => {
    console.log("selectedChat spcketon geldi", selectedChat);
    ChatId = selectedChat; // selectedChat içinden UserId değerini alın

    // getOneUserMessages fonksiyonunu çağırırken ReceiverId olarak UserId değerini kullanın
    await emitSelectedChatMessages(socket, ChatId);
  });

  socket.on("deleteChatId", async (deleteChatId) => {
    await deleteChat(deleteChatId);
    await getMessages(
      (filteredMessages) => {
        socketFilteredMessages = filteredMessages;
        //console.log("gelen mesajlar", filteredMessages);
        socket.emit("allIncomingMessages", socketFilteredMessages);
      },

      filterId
    );
  });

  // Bağlantı kesilme olayını dinleyin
  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı");
  });
});

// HTTP sunucusunu belirtilen portta dinle
server.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor`);
});
