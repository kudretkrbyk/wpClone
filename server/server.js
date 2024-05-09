const admin = require("firebase-admin");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABASE_URL",
});

const db = admin.firestore();

// Socket.IO'yu HTTP sunucusuna bağlayın
const server = http.createServer(app);
const io = socketIo(server);

// Verileri al ve Socket.IO üzerinden frontend'e gönder
const getPersons = async () => {
  try {
    const personsRef = db.collection("persons");
    const snapshot = await personsRef.get();

    const persons = [];
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      persons.push(data);
    });

    io.emit("initialData", persons); // Verileri frontend'e gönder
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }
};

// Arka planda verileri güncelle
setInterval(() => {
  getPersons(); // Her 5 dakikada bir verileri güncelle
}, 300000); // 300000 ms = 5 dakika

// Socket bağlantı olayını dinle
io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı");
});

// HTTP sunucusunu belirtilen portta dinle
server.listen(port, () => {
  console.log(`Sunucu ${port} nolu portta çalışıyor`);
});
