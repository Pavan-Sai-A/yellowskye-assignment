import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu_ic5eorWwPzRV6NNhbuQK5F4LA55V1k",
  authDomain: "yellowskye-e2e31.firebaseapp.com",
  projectId: "yellowskye-e2e31",
  storageBucket: "yellowskye-e2e31.firebasestorage.app",
  messagingSenderId: "716096888861",
  appId: "1:716096888861:web:8a0afdac754b6d732d66f4",
  measurementId: "G-0X4K24XWZG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
