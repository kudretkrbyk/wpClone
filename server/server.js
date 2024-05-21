const admin = require("firebase-admin");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const getPersons = require("./requests/getPersons");
const getMessages = require("./requests/getMessages");
const getOneUserMessages = require("./requests/getOneUserMessages");
const emitSelectedChatMessages = require("./functions/emitChatFunc");
const deleteChat = require("./requests/deleteChat");
const emitIncomingMessages = require("./functions/emitIncomingMessage");
const addMessages = require("./requests/addMessages");

const port = process.env.PORT || 3001;
const app = express();
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

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  socket.on("joinRoom", (userId) => {
    console.log(`Kullanıcı ${socket.id}, ${userId} odasına katıldı`);
    socket.join(userId);

    getMessages(
      (filteredMessages) => {
        socketFilteredMessages = filteredMessages;
        console.log("gelen mesajlar ,", filteredMessages);
        emitIncomingMessages(io, socketFilteredMessages, userId);
      },
      userId,
      persons
    );

    io.to(userId).emit("initialData", persons);

    socket.on("selectedChat", async (selectedChat) => {
      console.log("selectedChat socket.on geldi", selectedChat);
      ChatId = selectedChat;
      getOneUserMessages((callback) => {
        let selectedChatMessages = callback;
        io.to(userId).emit("selectedChatMessages", selectedChatMessages);
      }, ChatId);
      await emitSelectedChatMessages(socket, ChatId);
    });

    socket.on("sendingMessage", async (sendingMessageData) => {
      console.log(
        "DB tarafına gelen gönderilecek mesajlar:",
        sendingMessageData
      );
      const newChatId = sendingMessageData.ChatId;
      addMessages(
        (callback) => {
          getMessages(
            (filteredMessages) => {
              socketFilteredMessages = filteredMessages;
              emitIncomingMessages(socket, socketFilteredMessages);
              const receiverId = sendingMessageData.ReceiverId;
              console.log("mesaj ekleme kısmı geldi", socketFilteredMessages);
              io.to(receiverId).emit("newChatMessages", socketFilteredMessages);
            },
            userId,
            persons
          );
          socket.emit("allIncomingMessages", socketFilteredMessages);

          getOneUserMessages((newMessages) => {
            let selectedNewChatMessages = newMessages;
            console.log("gom server", selectedNewChatMessages);
            io.to(userId).emit("newChatMessages", selectedNewChatMessages);
            const receiverId = sendingMessageData.ReceiverId;
            io.to(receiverId).emit("newChatMessages", selectedNewChatMessages);
          }, newChatId);
        },
        userId,
        sendingMessageData
      );
    });

    socket.on("deleteChatId", async (deleteChatId) => {
      await deleteChat(deleteChatId);
      await getMessages(
        (filteredMessages) => {
          socketFilteredMessages = filteredMessages;
          io.to(userId).emit("allIncomingMessages", socketFilteredMessages);
        },
        userId,
        persons
      );
      socket.emit("allIncomingMessages", socketFilteredMessages);
    });

    socket.on("disconnect", () => {
      console.log("Bir kullanıcı ayrıldı");
    });
  });
});

// HTTP sunucusunu belirtilen portta dinle
server.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor`);
});
