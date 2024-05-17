const admin = require("firebase-admin");

const getOneUserMessages = async (callback, ChatId) => {
  const serviceAccount = require("../key.json");
  const admin = require("firebase-admin");
  const db = admin.firestore();

  try {
    let newMessages = [];
    const messagesRef = db.collection("messages").where("ChatId", "==", ChatId);
    const snapshot = await messagesRef.get();

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Mesaj verisi: gom içi", ChatId);
      newMessages.push(data);
    });

    callback(newMessages);

    //console.log("gom içi", newMessages);
  } catch (error) {
    console.error("Veriler alınamadı:", error);
    throw error;
  }
};

module.exports = getOneUserMessages;
