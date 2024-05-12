const getFilteredPerson = async (callback, userId) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");

  const db = admin.firestore();
  let filteredPerson = [];

  try {
    const personsRef = db.collection("persons").where("userId", "==", userId);

    const snapshot = await personsRef.get();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      filteredPerson.push(data);
      callback(filteredPerson);
    });
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }

  console.log("filteredPerson", filteredPerson);
  return getFilteredPerson; //
};

module.exports = getFilteredPerson;
