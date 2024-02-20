// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANr3gcQKLZggCD_nE5uxnJj_95gPbTnZc",
  authDomain: "js-users.firebaseapp.com",
  projectId: "js-users",
  storageBucket: "js-users.appspot.com",
  messagingSenderId: "916964957327",
  appId: "1:916964957327:web:738f3e070b8d862be9e4fa"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
