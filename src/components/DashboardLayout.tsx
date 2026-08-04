import { Link, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../lib/auth';
import { cn } from '../lib/utils';
import { 
  User, FileText, LayoutDashboard, Users, 
  FilePlus, Bell, LogOut, Menu, X, Mail, BookOpen
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout() {
  const { user, firebaseUser } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resending, setResending] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');

  if (!user) return null;

  const handleResendVerification = async () => {
    if (!firebaseUser) return;
    setResending(true);
    setVerifyMsg('');
    try {
      await sendEmailVerification(firebaseUser);
      setVerifyMsg('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setVerifyMsg(err.message || 'Failed to send verification email.');
    } finally {
      setResending(false);
    }
  };

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Applications', path: '/admin/applications', icon: FileText },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
    { name: 'News & Updates', path: '/admin/news', icon: Bell },
    { name: 'Katiba / Constitution', path: '/admin/constitution', icon: BookOpen },
  ];

  const userLinks = [
    { name: 'My Profile', path: '/dashboard', icon: User },
    { name: 'Apply for Services', path: '/dashboard/apply', icon: FilePlus },
    { name: 'My Applications', path: '/dashboard/applications', icon: FileText },
    { name: 'Updates', path: '/dashboard/updates', icon: Bell },
    { name: 'Katiba / Constitution', path: '/dashboard/constitution', icon: BookOpen },
  ];

  const staffLinks = [
    { name: 'Staff Portal', path: '/staff', icon: LayoutDashboard },
    { name: 'My Profile', path: '/staff/profile', icon: User },
    { name: 'Apply for Services', path: '/staff/apply', icon: FilePlus },
    { name: 'My Applications', path: '/staff/applications', icon: FileText },
    { name: 'Katiba / Constitution', path: '/staff/constitution', icon: BookOpen },
  ];

  let links = userLinks;
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
  }
  
  const currentLinkName = links.find(l => l.path === location.pathname)?.name || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col md:flex-row text-[#2D2A26] font-sans overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 border-b border-[#2D2A26]/10 bg-white z-20">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Maisha Plus Logo" className="w-12 h-12 object-contain flex-shrink-0" />
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-full md:w-64 bg-[#F2F0EB] border-r border-[#2D2A26]/10 flex flex-col absolute md:relative z-10 h-[calc(100vh-81px)] md:h-screen transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="hidden md:flex p-8 border-b border-[#2D2A26]/10 items-center">
          <Link to="/" className="flex items-center hover:opacity-80">
            <img src="/logo.png" alt="Maisha Plus Logo" className="w-16 h-16 object-contain flex-shrink-0" />
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          {/* User Widget */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#2D2A26]/5 flex flex-col gap-3">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">
              {user.role === 'admin' ? 'Administrator' : 
               ['accountant', 'secretary', 'chairman'].includes(user.role) ? 'Staff Member' : 'Member'}
            </span>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A5D4A] flex items-center justify-center text-white font-bold text-sm">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm truncate">{user.firstName} {user.lastName}</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-50 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2 px-2">Menu</span>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/admin' && link.path !== '/dashboard' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    isActive 
                      ? "bg-[#2D2A26] text-white shadow-md" 
                      : "text-[#2D2A26] hover:bg-white/60"
                  )}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-[#2D2A26]/10">
          <button
            onClick={() => signOut(auth)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#2D2A26] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-81px)] md:h-screen overflow-hidden bg-[#FAF9F6]">
        <header className="hidden md:flex p-8 border-b border-[#2D2A26]/10 justify-between items-end">
          <div>
            <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-1 block">
              {user.role === 'admin' ? 'Admin Portal' : 
               ['accountant', 'secretary', 'chairman'].includes(user.role) ? 'Staff Portal' : 'Member Portal'}
            </span>
            <h1 className="text-3xl font-serif font-black tracking-tight">{currentLinkName}</h1>
          </div>
          <Link to="/" className="text-[10px] uppercase font-bold tracking-widest border-b border-[#2D2A26] hover:text-[#C25E30] hover:border-[#C25E30] transition-colors pb-1">
            Back to Public Site
          </Link>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {firebaseUser && !firebaseUser.emailVerified && (
            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold">Email Verification Required</p>
                  <p className="text-amber-800 opacity-90">
                    Your email (<strong>{firebaseUser.email}</strong>) is not yet verified. Please verify your email to ensure full access to all services.
                  </p>
                  {verifyMsg && <p className="mt-1 font-bold text-emerald-700">{verifyMsg}</p>}
                </div>
              </div>
              <button
                onClick={handleResendVerification}
                disabled={resending}
                className="bg-amber-800 text-white px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-wider hover:bg-amber-900 transition-colors disabled:opacity-50 shrink-0"
              >
                {resending ? 'Sending...' : 'Resend Verification Email'}
              </button>
            </div>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
