const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');

code = code.replace(
  "(!('imageUrl' in data) || (data.imageUrl is string && data.imageUrl.size() <= 500));",
  "(!('imageUrl' in data) || (data.imageUrl is string && data.imageUrl.size() <= 500)) &&\n        (!('venue' in data) || (data.venue is string && data.venue.size() <= 200)) &&\n        (!('meetingDate' in data) || (data.meetingDate is string && data.meetingDate.size() <= 50)) &&\n        (!('meetingTime' in data) || (data.meetingTime is string && data.meetingTime.size() <= 50)) &&\n        (!('agenda' in data) || (data.agenda is string && data.agenda.size() <= 2000));"
);

fs.writeFileSync('firestore.rules', code);
