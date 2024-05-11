const admin = require("firebase-admin");

const getPersons = async (callback) => {
  const serviceAccount = require("../key.json");
  const db = admin.firestore();
  let persons = [];

  try {
    const personsRef = db.collection("persons");
    const snapshot = await personsRef.get();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      persons.push(data);
    });

    callback(persons);
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }
};

module.exports = getPersons;
