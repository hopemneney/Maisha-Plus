const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf8');

const oldConfig = `const firebaseConfig = {
  projectId: "gen-lang-client-0322087496",
  appId: "1:1053119341276:web:9e5f02f973f025dbe7ca19",
  apiKey: "AIzaSyCHdLvvlXE27pvWw-o5mWQutF8NDzJoJ88",
  authDomain: "gen-lang-client-0322087496.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-maishaplus-a8574ec6-f5d1-43e4-bed5-60b8d3e4c0cc",
  storageBucket: "gen-lang-client-0322087496.firebasestorage.app",
  messagingSenderId: "1053119341276",
  measurementId: ""
};`;

const newConfig = `const firebaseConfig = {
  apiKey: "AIzaSyCLiYNpPils0qnBekuyVxSscbGwB0yjpw4",
  authDomain: "maisha-plus-b95aa.firebaseapp.com",
  projectId: "maisha-plus-b95aa",
  storageBucket: "maisha-plus-b95aa.firebasestorage.app",
  messagingSenderId: "910283416435",
  appId: "1:910283416435:web:6303fedeb70ee0fbd29b06"
};`;

code = code.replace(oldConfig, newConfig);

// Also remove the specific database ID from getFirestore since the user's project likely uses the default database
code = code.replace(
  'export const db = getFirestore(app, "ai-studio-maishaplus-a8574ec6-f5d1-43e4-bed5-60b8d3e4c0cc");',
  'export const db = getFirestore(app);'
);

fs.writeFileSync('src/lib/firebase.ts', code);
