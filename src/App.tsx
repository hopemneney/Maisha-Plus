/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth';

// Layouts
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Projects from './pages/public/Projects';
import News from './pages/public/News';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// User Dashboard Pages
import UserDashboard from './pages/dashboard/user/UserDashboard';
import ApplyForServices from './pages/dashboard/user/ApplyForServices';
import MyApplications from './pages/dashboard/user/MyApplications';
import Updates from './pages/dashboard/user/Updates';
import Constitution from './pages/dashboard/user/Constitution';

// Admin Dashboard Pages
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import ManageApplications from './pages/dashboard/admin/ManageApplications';
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import ManageNews from './pages/dashboard/admin/ManageNews';

// Staff Dashboard Pages
import StaffDashboard from './pages/dashboard/staff/StaffDashboard';

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          {/* Public Routes with Main Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/news" element={<News />} />
            <Route path="/constitution" element={<Constitution />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* User Dashboard Routes */}
          <Route element={<ProtectedRoute requiredRole="user" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/apply" element={<ApplyForServices />} />
              <Route path="/dashboard/applications" element={<MyApplications />} />
              <Route path="/dashboard/updates" element={<Updates />} />
              <Route path="/dashboard/constitution" element={<Constitution />} />
            </Route>
          </Route>

          {/* Staff Dashboard Routes */}
          <Route element={<ProtectedRoute requiredRoles={['accountant', 'secretary', 'chairman']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/profile" element={<UserDashboard />} />
              <Route path="/staff/apply" element={<ApplyForServices />} />
              <Route path="/staff/applications" element={<MyApplications />} />
              <Route path="/staff/constitution" element={<Constitution />} />
            </Route>
          </Route>

          {/* Admin Dashboard Routes */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/applications" element={<ManageApplications />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/news" element={<ManageNews />} />
              <Route path="/admin/constitution" element={<Constitution />} />
            </Route>
          </Route>

          {/* Chairman Routes */}
          <Route element={<ProtectedRoute requiredRoles={['chairman', 'admin']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/staff/overview" element={<AdminDashboard />} />
              <Route path="/staff/users" element={<ManageUsers />} />
              <Route path="/staff/news" element={<ManageNews />} />
            </Route>
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
