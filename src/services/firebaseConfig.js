// Firebase Configuration for AYYAN SNACKS SPOT
const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const firebaseConfig = {
  projectId: env.VITE_FIREBASE_PROJECT_ID || "ayyan-snacks-spot",
  appId: env.VITE_FIREBASE_APP_ID || "1:172323932491:web:dbb5c920b7213aea6fc0ce",
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDUxlKCzXhBtX8uRPNW1oReEs2D-M-gmZs",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "ayyan-snacks-spot.firebaseapp.com",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "ayyan-snacks-spot.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "172323932491",
};

export default firebaseConfig;
