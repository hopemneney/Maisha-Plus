const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardLayout.tsx', 'utf8');

code = code.replace(
  "  let links = userLinks;\n  if (user.role === 'admin') links = adminLinks;\n  else if (['accountant', 'secretary', 'chairman'].includes(user.role)) links = staffLinks;",
  `  let links = userLinks;
  if (user.role === 'admin') {
    links = adminLinks;
  } else if (user.role === 'chairman') {
    links = [
      ...staffLinks,
      { name: 'Overview', path: '/staff/overview', icon: LayoutDashboard },
      { name: 'Manage Users', path: '/staff/users', icon: Users },
      { name: 'News & Updates', path: '/staff/news', icon: Bell },
    ];
  } else if (['accountant', 'secretary'].includes(user.role)) {
    links = staffLinks;
  }`
);

fs.writeFileSync('src/components/DashboardLayout.tsx', code);
