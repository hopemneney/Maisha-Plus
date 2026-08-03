import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { dbApi } from '../../lib/firestore';

export default function SignUp() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: import("react").FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const fUser = userCredential.user;
      
      const newUser = {
        id: fUser.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: 'Mbezi Msakuzi Kusini',
        role: formData.email === 'admin@maishaplus.com' ? ('admin' as const) : ('user' as const),
        createdAt: new Date().toISOString()
      };
      
      await dbApi.addUser(newUser);

      // Send email verification
      try {
        await sendEmailVerification(fUser);
      } catch (vErr) {
        console.warn("Could not send verification email:", vErr);
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError('');
    setMessage('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const fUser = userCredential.user;

      let user = await dbApi.getUser(fUser.uid);
      if (!user) {
        const displayName = fUser.displayName || '';
        const parts = displayName.trim().split(' ');
        const firstName = parts[0] || 'Member';
        const lastName = parts.slice(1).join(' ') || '';

        user = {
          id: fUser.uid,
          firstName,
          lastName,
          email: fUser.email || '',
          address: 'Mbezi Msakuzi Kusini',
          role: fUser.email === 'admin@maishaplus.com' ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        };
        await dbApi.addUser(user);
      }

      if (!fUser.emailVerified) {
        try {
          await sendEmailVerification(fUser);
        } catch (vErr) {
          console.warn("Verification email notice:", vErr);
        }
      }

      if (user) {
        if (user.role === 'admin') navigate('/admin');
        else if (['accountant', 'secretary', 'chairman'].includes(user.role)) navigate('/staff');
        else navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F2F0EB]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
        <div className="text-center">
          <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">Join Us</span>
          <h2 className="text-4xl font-serif font-black tracking-tight text-[#2D2A26]">Create Account</h2>
        </div>

        {error && <div className="text-red-600 bg-red-50 p-4 rounded-xl text-sm border border-red-100 font-bold">{error}</div>}
        {message && <div className="text-emerald-700 bg-emerald-50 p-4 rounded-xl text-sm border border-emerald-100 font-bold">{message}</div>}

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="w-full bg-white text-[#2D2A26] border border-[#2D2A26]/20 px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-[#FAF9F6] transition-colors disabled:opacity-50 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {googleLoading ? 'Connecting Google...' : 'Sign up with Google'}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-[#2D2A26]/10"></div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#2D2A26]/40">or with email</span>
            <div className="flex-1 border-t border-[#2D2A26]/10"></div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">First Name</label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Last Name</label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Password</label>
            <input
              required
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-[#2D2A26] text-white px-8 py-4 uppercase tracking-widest font-bold text-xs rounded-xl hover:bg-[#2D2A26]/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="text-center mt-6 text-sm opacity-80 font-bold">
          Already have an account? <Link to="/login" className="text-[#C25E30] hover:underline uppercase tracking-widest text-[10px] ml-2">Login</Link>
        </div>
      </div>
    </div>
  );
}

