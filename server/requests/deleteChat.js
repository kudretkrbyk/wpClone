const admin = require("firebase-admin");

const deleteChat = async (ChatId) => {
  const serviceAccount = require("../key.json");
  const db = admin.firestore();

  try {
    const messagesRef = db.collection("messages");
    const snapshot = await messagesRef.where("ChatId", "==", ChatId).get();

    // Mesajları sil
    const deletePromises = [];
    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);

    console.log("Chat başarıyla silindi");
  } catch (error) {
    console.error("Error deleting chat:", error);
  }
};

module.exports = deleteChat;
