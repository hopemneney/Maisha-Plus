const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  "function isAdmin() { return isSignedIn() && exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'; }",
  "function isAdmin() { return isSignedIn() && exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'; }\n    function isChairman() { return isSignedIn() && exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'chairman'; }"
);

rules = rules.replace(
  "(isAdmin())",
  "(isAdmin() || isChairman())"
);

rules = rules.replace(
  "allow create: if isAdmin() && isValidId(newsId)",
  "allow create: if (isAdmin() || isChairman()) && isValidId(newsId)"
);

rules = rules.replace(
  "allow update: if isAdmin() && isValidId(newsId)",
  "allow update: if (isAdmin() || isChairman()) && isValidId(newsId)"
);

fs.writeFileSync('firestore.rules', rules);
