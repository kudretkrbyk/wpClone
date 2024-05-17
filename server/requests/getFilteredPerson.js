const getFilteredPerson = async (callback, filterPersonId) => {
  const admin = require("firebase-admin");
  const serviceAccount = require("../key.json");

  const db = admin.firestore();
  let filteredPerson = [];
  try {
    const personsRef = db
      .collection("persons")
      .where("userId", "==", filterPersonId);
    const snapshot = await personsRef.get();
    snapshot.docs.forEach((doc) => {
      const data = doc.data();

      callback(data);
    });
  } catch (error) {
    console.error("Veriler alınamadı:", error);
  }

  return getFilteredPerson; //
};

module.exports = getFilteredPerson;
