import { Link, Outlet, useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../lib/auth';
import { Menu, X, User as UserIcon, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'sw' : 'en');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.news'), path: '/news' },
    { name: 'Katiba', path: '/constitution' },
  ];

  const getPageTitle = () => {
    const currentLink = navLinks.find(link => link.path === location.pathname);
    return currentLink ? `${currentLink.name} | Maisha Plus+` : 'Maisha Plus+';
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-[#2D2A26]">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Maisha Plus+ Group - Community development and empowerment projects in Tanzania." />
      </Helmet>
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
        <div className="px-6 lg:px-12">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Maisha Plus Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain flex-shrink-0" />
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest opacity-80">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "transition-colors hover:text-[#C25E30]",
                    location.pathname === link.path ? "text-[#C25E30] opacity-100" : "text-[#2D2A26]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex gap-4 items-center">
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2A26] hover:text-[#C25E30] transition-colors mr-2">
                <Globe className="w-3 h-3" />
                {i18n.language === 'en' ? 'SW' : 'EN'}
              </button>
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="px-6 py-2 border border-[#2D2A26] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <UserIcon className="w-3 h-3" /> Dashboard
                  </Link>
                  <button
                    onClick={() => signOut(auth)}
                    className="px-6 py-2 bg-[#2D2A26] text-white rounded-full text-[10px] font-bold uppercase tracking-widest"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 border border-[#2D2A26] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26] hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-[#2D2A26] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2A26]/90 transition-colors"
                  >
                    Join Group
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-4">
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2A26]">
                <Globe className="w-3 h-3" />
                {i18n.language === 'en' ? 'SW' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#2D2A26]"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F6] border-b border-[#2D2A26]/10 px-6 py-4 space-y-4">
            <div className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    location.pathname === link.path ? "text-[#C25E30]" : "text-[#2D2A26] opacity-80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#2D2A26]/10 pt-4 flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-bold uppercase tracking-widest text-[#2D2A26]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { signOut(auth); setMobileMenuOpen(false); }}
                    className="text-left text-[11px] font-bold uppercase tracking-widest text-[#C25E30]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-bold uppercase tracking-widest text-[#2D2A26]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-bold uppercase tracking-widest text-[#C25E30]"
                  >
                    Join Group
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 lg:py-6 bg-[#2D2A26] text-white flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest opacity-60 text-center md:text-left">
          &copy; {new Date().getFullYear()} Maisha Plus Group. @Hope Mneney 
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-widest font-bold">
          <Link to="/about" className="hover:text-[#C25E30] transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
