import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAH3bqnRZ5RTSqYfUEYtIiXlJSfQcquqCg",
  authDomain: "quickdev-6d92e.firebaseapp.com",
  databaseURL: "https://quickdev-6d92e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quickdev-6d92e",
  storageBucket: "quickdev-6d92e.firebasestorage.app",
  messagingSenderId: "237988313994",
  appId: "1:237988313994:web:f01dd5f00939a79a766673",
  measurementId: "G-6G7RJ0VNM5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);