const getMessages = require("../requests/getMessages");
let updatedMessages = "";

// Mesaj gönderme fonksiyonu
const addMessages = async (callback, filterId, message) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");
  const db = admin.firestore();
  const newMessage = {
    ChatId: parseInt(message.ChatId),

    Content: message.Content.toString(),

    MessageId: parseInt(message.MessageId),

    ReceiverId: parseInt(message.ReceiverId),

    SenderId: parseInt(message.SenderId),

    _Date: message._Date,

    forwarded: Boolean(message.forwarded),

    isRead: Boolean(message.isRead),
  };
  console.log("add message", newMessage.ChatId);
  try {
    // messages koleksiyonuna referans oluştur
    const messagesRef = db.collection("messages");

    // Yeni mesaj belgesi oluştur
    const newMessageRef = await messagesRef
      .doc(String(message.MessageId)) // MessageId değerini belge adı olarak kullanın
      .set(newMessage);

    console.log("Mesaj başarıyla gönderildi. ID:", newMessageRef.id);
    await getMessages(
      (filteredMessages) => {
        console.log("add message içi get message geldi");

        updatedMessages = filteredMessages[0].Messages;
      },

      filterId
    );

    callback(updatedMessages);
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
};

module.exports = addMessages;
