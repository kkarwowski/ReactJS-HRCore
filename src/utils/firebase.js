import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   APPKey: "AIzaSyAmyN-igSlOCp5FfgT3_SfIBuePq45Th6E",
//   authDomain: "hrcore-app.firebaseapp.com",
//   projectId: "hrcore-app",
//   storageBucket: "hrcore-app.appspot.com",
//   messagingSenderId: "805499775738",
//   appId: "1:805499775738:web:afe934b3e09e7de045f743"
// };

const firebaseConfig = {
  APPKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
export default db
