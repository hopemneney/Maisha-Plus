import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLiYNpPils0qnBekuyVxSscbGwB0yjpw4",
  authDomain: "maisha-plus-b95aa.web.app",
  projectId: "maisha-plus-b95aa",
  storageBucket: "maisha-plus-b95aa.firebasestorage.app",
  messagingSenderId: "910283416435",
  appId: "1:910283416435:web:6303fedeb70ee0fbd29b06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize IndexedDB persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a a time.
    console.warn('Firebase persistence failed: multiple tabs open');
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.warn('Firebase persistence failed: unimplemented browser support');
  }
});
