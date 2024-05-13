const admin = require("firebase-admin");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const getPersons = require("./requests/getPersons");
const getFilteredPerson = require("./requests/getFilteredPerson");
const getMessages = require("./requests/getMessages");

const addMessages = require("./requests/addMessages");

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
const filterId = "110"; // Filtrelemek istediğiniz kullanıcının ID'si
getMessages((filteredMessages) => {
  console.log("server", filteredMessages);
  socketFilteredMessages = filteredMessages;
}, filterId);

//addMessages();

// Socket bağlantı olayını dinle
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  // Bağlı istemcilere mevcut kişileri gönder
  socket.emit("initialData", persons);
  //istemciye alıcısı istemci olduğu mesajları gönder
  socket.emit("allIncomingMessages", socketFilteredMessages);

  socket.on("sendingMessage", async (sendingMessageData) => {
    console.log(
      "server tarafına gelen gönderilecek mesajlar:",
      sendingMessageData
    );
    addMessages(sendingMessageData);
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
