import { initializeApp } from "firebase/app";
import { User } from "@firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_API_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_API_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_API_PROJECT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();

export async function googleLogin() {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      return result.user;
    })
    .catch(console.error);
}

export async function firebaseLogout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}

export function onUserStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function getUserLeague() {
  return get(ref(database, "footballMania/league")).then((snapshot) => {
    if (snapshot.exists()) {
      const leagues = snapshot.val();
      return leagues;
    }
  });
}
