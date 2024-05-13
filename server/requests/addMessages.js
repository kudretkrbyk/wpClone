// Mesaj gönderme fonksiyonu
const addMessages = async (message) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");
  const db = admin.firestore();
  try {
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
