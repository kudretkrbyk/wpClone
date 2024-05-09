const admin = require("firebase-admin");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const sendPersons = require("./sendPersons");

const port = process.env.PORT || 3000;
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

// Tüm kişileri alma ve saklama
const getPersons = async () => {
  try {
    const personsRef = db.collection("persons");
    const snapshot = await personsRef.get();

    persons = [];
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      persons.push(data);
    });
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }
  console.log(persons);
  sendPersons(persons);
};
// İlk başta verileri alıyoruz
getPersons();
// Socket bağlantı olayını dinle
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");

  // Bağlı istemcilere mevcut kişileri gönder
  socket.emit("initialData", persons);

  // Bağlantı kesilme olayını dinleyin
  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı");
  });
});

// HTTP sunucusunu belirtilen portta dinle
server.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor`);
});
