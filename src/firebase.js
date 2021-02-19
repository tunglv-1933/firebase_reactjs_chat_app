import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDWcMId6yO87rUIcZKsdbAh12fwIfTzRi0",
  authDomain: "chat-app-cdf6a.firebaseapp.com",
  projectId: "chat-app-cdf6a",
  storageBucket: "chat-app-cdf6a.appspot.com",
  messagingSenderId: "337687844787",
  appId: "1:337687844787:web:24b2645fb82d498f0e1dc6",
  measurementId: "G-8YZLQ4BQSE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db;
