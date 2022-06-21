// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5gqdUOokUbe65HQJKr3DfSJkvm05fi6M',
  authDomain: 'web-app-team-9f7d1.firebaseapp.com',
  projectId: 'web-app-team-9f7d1',
  storageBucket: 'web-app-team-9f7d1.appspot.com',
  messagingSenderId: '1012413654304',
  appId: '1:1012413654304:web:5a02ea04e1c2c6a59fe345',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);
export { auth };
