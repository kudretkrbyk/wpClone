const socketIo = require("socket.io-client");

const SERVER_URL = "http://localhost:3000"; // Sunucu URL'si

const sendPersons = (persons) => {
  const socket = socketIo(SERVER_URL); // Sunucuya bağlan

  // Sunucuya kişileri iletmek için emit kullan
  socket.emit("initialData", persons);

  // Soketi kapat
  socket.disconnect();
};

module.exports = sendPersons;
