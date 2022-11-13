// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO3MhabTp7wc5A-ejsCyEGUQ8XsqLJYHY",
  authDomain: "jap-login-ecommerce.firebaseapp.com",
  projectId: "jap-login-ecommerce",
  storageBucket: "jap-login-ecommerce.appspot.com",
  messagingSenderId: "422891455934",
  appId: "1:422891455934:web:e7c9a7e64c7231b42165ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);