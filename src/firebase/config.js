import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlSbQI7qlrHYoON4bmbr5s1LYA2GisYXg",
  authDomain: "shop-ba434.firebaseapp.com",
  projectId: "shop-ba434",
  storageBucket: "shop-ba434.appspot.com",
  messagingSenderId: "1004854028906",
  appId: "1:1004854028906:web:a2fd57740f4371e5857813"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}