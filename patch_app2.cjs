const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove Chairman Routes
code = code.replace(
  /\s*{\/\* Chairman Routes \*\/}[\s\S]*?<\/Route>\s*<\/Route>/g,
  ""
);

// Add Chairman Routes before Catch-all redirect
code = code.replace(
  "          {/* Catch-all redirect */}",
  `          {/* Chairman Routes */}\n          <Route element={<ProtectedRoute requiredRoles={['chairman', 'admin']} />}>\n            <Route element={<DashboardLayout />}>\n              <Route path="/staff/overview" element={<AdminDashboard />} />\n              <Route path="/staff/users" element={<ManageUsers />} />\n              <Route path="/staff/news" element={<ManageNews />} />\n            </Route>\n          </Route>\n\n          {/* Catch-all redirect */}`
);

fs.writeFileSync('src/App.tsx', code);
