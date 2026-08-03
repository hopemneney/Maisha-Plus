const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "</Routes>",
  `          {/* Chairman Routes */}\n          <Route element={<ProtectedRoute requiredRoles={['chairman']} />}>\n            <Route element={<DashboardLayout />}>\n              <Route path="/staff/overview" element={<AdminDashboard />} />\n              <Route path="/staff/users" element={<ManageUsers />} />\n              <Route path="/staff/news" element={<ManageNews />} />\n            </Route>\n          </Route>\n        </Routes>`
);

fs.writeFileSync('src/App.tsx', code);
