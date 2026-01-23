import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMg2ffCPVmhI58kvOI3gAenyJHWRc9wME",
  authDomain: "isite-2-test.firebaseapp.com",
  projectId: "isite-2-test",
  storageBucket: "isite-2-test.firebasestorage.app",
  messagingSenderId: "333012577798",
  appId: "1:333012577798:web:0141f6e35a0f9e48eb9d87"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function watchAuthState(onLoggedIn, onLoggedOut) {
  onAuthStateChanged(auth, (user) => {
    if (user) { onLoggedIn(user); }
    else { onLoggedOut(); }
  });
}

export async function isAdmin(user) {
  if (!user) return false;
  const ref = doc(db, "admins", user.email);
  const snap = await getDoc(ref);
  return snap.exists() && snap.data().role === "admin";
}

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

async function loadMinecraftHead(user) {
    const uid = user.uid;

    // Load Firestore user document
    const docRef = db.collection("users").doc(uid);
    const snapshot = await docRef.get();

    if (!snapshot.exists) return;

    const data = snapshot.data();
    const uuid = data.uuid;

    if (!uuid) return;

    // Minotar avatar (HEAD ONLY)
    const imgUrl = `https://minotar.net/avatar/${uuid}/64`;

    // Replace login button with avatar
    const profileContainer = document.getElementById("profileArea");

    profileContainer.innerHTML = `
        <img src="${imgUrl}"
             alt="Profile"
             style="width:40px;height:40px;border-radius:4px;cursor:pointer;"
             onclick="window.location='member.html'" />
    `;
}
