import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBgWSj3h9wOEowBHwh9e0bKzIqm0LcEWSc',
  authDomain: 'parcial2-b4ff7.firebaseapp.com',
  projectId: 'parcial2-b4ff7',
  storageBucket: 'parcial2-b4ff7.firebasestorage.app',
  messagingSenderId: '111974480876',
  appId: '1:111974480876:web:2f0487a0cbe1909b2adec9',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
