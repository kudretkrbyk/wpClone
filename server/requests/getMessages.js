const getFilteredPerson = require("./getFilteredPerson");
let filteredMessages = [];

const getMessages = async (callback, filterId) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");

  const db = admin.firestore();
  let messages = [];
  let persons = []; // Kişilerin listesi

  try {
    const SenderIdd = "1"; // Değiştirin

    // Mesajları al
    const messagesRef = db
      .collection("messages")
      .where("ReceiverId", "==", filterId)
      .where("SenderId", "==", filterId);
    const messagesSnapshot = await messagesRef.get();

    messagesSnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push(data);
      console.log("messages gt", messages);
    });

    // Kişileri al ve mesajları eşleştir
    getFilteredPerson((filteredPersons) => {
      persons = filteredPersons;
      console.log("filtered persons getmes", persons);

      // Kişilere ait mesajları eşleştir
      for (let i = 0; i < persons.length; i++) {
        // Her bir kişi için bir nesne oluştur
        const personObj = {
          Name: persons[i].Name,
          About: persons[i].About,
          PhoneNumber: persons[i].PhoneNumber,
          ProfilePhoto: persons[i].ProfilePhoto,
          userId: persons[i].userId,
          Messages: [],
        };

        for (let a = 0; a < messages.length; a++) {
          if (persons[i].userId === messages[a].ReceiverId) {
            // Her bir mesaj için bir nesne oluştur
            const messageObj = {
              ChatId: messages[a].ChatId,
              Content: messages[a].Content,
              MessageId: messages[a].MessageId,
              ReceiverId: messages[a].ReceiverId,
              SenderId: messages[a].SenderId,
              _Date: messages[a]._Date,
              dHour: messages[a].dHour,
              forwarded: messages[a].forwarded,
              isRead: messages[a].isRead,
            };

            // Kişi nesnesinin Messages özelliğine mesajı ekle
            personObj.Messages.push(messageObj);
          }
        }

        // Oluşturulan kişi nesnesini filteredMessages listesine ekle
        filteredMessages.push(personObj);
      }

      console.log("son liste", filteredMessages);
      filteredMessages.forEach((person) => {
        console.log("Kişi Adı:", person.Name);
        console.log("Kişi Hakkında:", person.About);
        console.log("Telefon Numarası:", person.PhoneNumber);
        console.log("Profil Fotoğrafı:", person.ProfilePhoto);
        console.log("Kullanıcı ID:", person.userId);
        console.log("Mesajlar:");

        person.Messages.forEach((message) => {
          console.log("  Mesaj İçeriği:", message.Content);
          console.log("  Mesaj Tarihi:", message._Date);
          console.log("  Gönderen ID:", message.SenderId);
          console.log("  Alıcı ID:", message.ReceiverId);
          // Diğer mesaj özellikleri
        });
      });

      // Sonuçları geri çağır
      callback(filteredMessages);
      console.log("getmes kişiler", persons);
    }, filterId);
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }

  return messages; // Filtrelenmiş mesajları geri döndürün
};

module.exports = getMessages;
