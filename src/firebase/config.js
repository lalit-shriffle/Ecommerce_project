
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBkMicCOO6OGgscQoRPZa5ihDM53lpH-pg",
  authDomain: "ecommerce-ac775.firebaseapp.com",
  projectId: "ecommerce-ac775",
  storageBucket: "ecommerce-ac775.appspot.com",
  messagingSenderId: "118278875824",
  appId: "1:118278875824:web:417fe67264cb08262f6975",
  measurementId: "G-DRJJ3BSQ6M",
});
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
