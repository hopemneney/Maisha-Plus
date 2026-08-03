const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDocFromServer } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCLiYNpPils0qnBekuyVxSscbGwB0yjpw4",
  authDomain: "maisha-plus-b95aa.firebaseapp.com",
  projectId: "maisha-plus-b95aa",
  storageBucket: "maisha-plus-b95aa.firebasestorage.app",
  messagingSenderId: "910283416435",
  appId: "1:910283416435:web:6303fedeb70ee0fbd29b06"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    await getDocFromServer(doc(db, 'users', 'test'));
    console.log("Success");
  } catch (error) {
    console.error("Error:", error.message);
  }
}
test();
