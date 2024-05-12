// Mesaj gönderme fonksiyonu
const addMessages = async (message) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");
  const db = admin.firestore();
  try {
    const message = {
      Content: "serverdan gönderilen Merhaba veri tabanı mesajı",
      _Date: "11.05.2024",
      MessageId: "100",
      ChatId: "1",
      dHour: "18.16",
      isRead: false,
      forwarded: false,
      ReceiverId: "110",
      SenderId: "1",
    };

    // messages koleksiyonuna referans oluştur
    const messagesRef = db.collection("messages");

    // Yeni mesaj belgesi oluştur
    const newMessageRef = await messagesRef.doc(message.MessageId).set(message);

    console.log("Mesaj başarıyla gönderildi. ID:", newMessageRef.id);
    return newMessageRef.id; // Gönderilen mesajın ID'sini döndür
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
};

module.exports = addMessages;
