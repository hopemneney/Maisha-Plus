const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export interface NewsItem {\n  id: string;\n  title: string;\n  content: string;\n  authorId: string;\n  createdAt: string;\n  imageUrl?: string;\n}",
  `export interface NewsItem {\n  id: string;\n  title: string;\n  content: string;\n  authorId: string;\n  createdAt: string;\n  imageUrl?: string;\n  venue?: string;\n  meetingDate?: string;\n  meetingTime?: string;\n  agenda?: string;\n}`
);

fs.writeFileSync('src/types.ts', code);
