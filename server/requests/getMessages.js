const createPersonObject = require("../functions/createPersonObject");

const getMessages = async (callback, filterId, persons) => {
  console.log("get messages iç", persons);
  const admin = require("firebase-admin");
  const { Filter } = require("firebase-admin/firestore");
  const serviceAccount = require("../key.json");
  filterId = parseInt(filterId, 10);
  const db = admin.firestore();
  let messages = [];

  if (persons && persons.length > 0) {
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
      });

      for (const groupId in groupedMessages) {
        const groupMessages = groupedMessages[groupId];
        const firstMessage = groupMessages[0];
        const { SenderId, ReceiverId } = firstMessage;

        // persons listesinden filtreleme
        const getPersonFromList = (id) =>
          persons.find((person) => person.userId === id);

        let personObj;
        if (SenderId === filterId && ReceiverId === filterId) {
          const person = getPersonFromList(SenderId);
          if (!person) {
            console.error("Person not found for SenderId:", SenderId);
            continue;
          }
          personObj = createPersonObject(person, groupMessages);
          filteredMessages.push(personObj);
        } else if (SenderId === filterId && ReceiverId !== filterId) {
          const person = getPersonFromList(ReceiverId);
          if (!person) {
            console.error("Person not found for ReceiverId:", ReceiverId);
            continue;
          }
          personObj = createPersonObject(person, groupMessages);
          filteredMessages.push(personObj);
        } else {
          const person = getPersonFromList(SenderId);
          if (!person) {
            console.error("Person not found for SenderId:", SenderId);
            continue;
          }
          personObj = createPersonObject(person, groupMessages);
          filteredMessages.push(personObj);
        }
      }
      callback(filteredMessages);
    } catch (error) {
      console.error("Veriler alınamadı:", error);
    }
  } else {
    console.error("Persons list is empty or undefined.");
  }

  return messages; // Filtrelenmiş mesajları geri döndürün
};

module.exports = getMessages;
