import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCte55bdl0-pNdy75PiQ88tzuvT99qqfYA",
  authDomain: "reto-8-7d941.firebaseapp.com",
  databaseURL: "https://reto-8-7d941-default-rtdb.firebaseio.com",
  projectId: "reto-8-7d941",
  storageBucket: "reto-8-7d941.firebasestorage.app",
  messagingSenderId: "863694819527",
  appId: "1:863694819527:web:33403f60a661322b1deee2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);