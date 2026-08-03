const fs = require('fs');
const file = 'src/pages/dashboard/staff/StaffDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/dbApi\.updateApplication\(id,\s*\{\s*status:\s*nextStatus,\s*updatedAt[^}]+\}\)/g, 'dbApi.updateApplicationStatus(id, nextStatus)');
content = content.replace(/dbApi\.updateApplication\(id,\s*\{\s*status:\s*rejectStatus,\s*updatedAt[^}]+\}\)/g, 'dbApi.updateApplicationStatus(id, rejectStatus)');
fs.writeFileSync(file, content);
