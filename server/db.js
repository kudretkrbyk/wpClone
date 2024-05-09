var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
