import firebase from "firebase";
const config = require("./config.json");

const firebaseConfig = {
   apiKey: config.apiKey,
   authDomain: config.authDomain,
   projectId: config.projectId,
   storageBucket: config.storageBucket,
   messagingSenderId: config.messagingSenderId,
   appId: config.appId,
   measurementId: config.measurementId
 };

 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
 const storage = firebase.storage();

 export { auth, provider, storage };
 export default db;