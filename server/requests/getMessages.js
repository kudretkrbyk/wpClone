const getMessages = async () => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");

  const db = admin.firestore();
  let messages = [];

  try {
    const SenderId = "1"; // Değiştirin
    const ReceiverId = "1"; // Değiştirin

    const personsRef = db
      .collection("messages")
      .where("SenderId", "==", SenderId)
      .where("ReceiverId", "==", ReceiverId);
    const snapshot = await personsRef.get();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      messages.push(data);
    });
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }

  console.log("mesajlar", messages);
  return messages; // Filtrelenmiş mesajları geri döndürün
};

module.exports = getMessages;
