// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ15tgSpEW88qNvdHTsmoC27bnG7j5DRo",
  authDomain: "furniture-a5a01.firebaseapp.com",
  projectId: "furniture-a5a01",
  storageBucket: "furniture-a5a01.appspot.com",
  messagingSenderId: "645927463343",
  appId: "1:645927463343:web:8ca7e8e76d4a4d2873275a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export {
  initializeApp,
  firebaseConfig,
  getAuth,
  where,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  addDoc,
  setDoc,
  collection,
  db,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
};
