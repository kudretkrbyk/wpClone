const getFilteredPerson = require("./getFilteredPerson");
const createPersonObject = require("../functions/createPersonObject");
const emitIncomingMessages = require("../functions/emitIncomingMessage");

const getMessages = async (callback, filterId) => {
  const admin = require("firebase-admin");
  const { Filter } = require("firebase-admin/firestore");
  const serviceAccount = require("../key.json");
  filterId = parseInt(filterId);
  const db = admin.firestore();
  let messages = [];
  let persons = []; // Kişilerin listesi

  try {
    let filteredMessages = [];
    // Mesajları al
    const messagesRef = db
      .collection("messages")
      .where(
        Filter.or(
          Filter.where("ReceiverId", "==", filterId),
          Filter.where("SenderId", "==", filterId)
        )
      );

    const messagesSnapshot = await messagesRef.get();

    messagesSnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push(data);
    });

    // Mesajları ChatId'ye göre gruplandır
    const groupedMessages = {};
    messages.forEach((message) => {
      if (!groupedMessages[message.ChatId]) {
        groupedMessages[message.ChatId] = [];
      }
      groupedMessages[message.ChatId].push(message);
      // console.log("Gruplanmış mesajlar ", groupedMessages);
    });

    for (const groupId in groupedMessages) {
      const groupMessages = groupedMessages[groupId];
      const firstMessage = groupMessages[0];
      const { SenderId, ReceiverId } = firstMessage;

      // Asenkron işlemi bekleyerek filteredMessages dizisine eleman ekleyin
      await new Promise((resolve, reject) => {
        let personObj;

        // Eşleşme kontrolü ve ilgili işlemi gerçekleştirme
        if (SenderId === filterId && ReceiverId === filterId) {
          getFilteredPerson((person) => {
            personObj = createPersonObject(person, groupMessages);
            filteredMessages.push(personObj);

            resolve();
          }, SenderId);
        } else if (SenderId === filterId && ReceiverId !== filterId) {
          getFilteredPerson((person) => {
            personObj = createPersonObject(person, groupMessages);
            filteredMessages.push(personObj);

            resolve();
          }, ReceiverId);
        } else {
          getFilteredPerson((person) => {
            personObj = createPersonObject(person, groupMessages);
            filteredMessages.push(personObj);

            resolve();
          }, SenderId);
        }
      });
    }
    callback(filteredMessages);
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }

  return messages; // Filtrelenmiş mesajları geri döndürün
};

module.exports = getMessages;
