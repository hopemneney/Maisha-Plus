import { useState } from 'react';
import { useAuth } from '../../../lib/auth';
import { dbApi } from '../../../lib/firestore';
import { useUserApplications } from '../../../lib/useDbData';
import { ApplicationProgress } from '../../../components/ui/ApplicationProgress';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();
  const { applications, loading: appsLoading } = useUserApplications();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    address: user?.address || 'Mbezi Msakuzi Kusini'
  });

  const handleSave = async () => {
    if (user) {
      setSaving(true);
      await dbApi.updateUser(user.id, formData);
      setSaving(false);
      setEditing(false);
      window.location.reload();
    }
  };

  if (!user) return null;

  const pendingApps = applications.filter(a => a.status.startsWith('Pending'));
  const applicationsLink = user.role === 'user' ? '/dashboard/applications' : '/staff/applications';

  return (
    <div className="max-w-3xl space-y-8">
      {!appsLoading && pendingApps.length > 0 && (
        <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#2D2A26]">Active Application Tracker</h2>
              <p className="text-sm opacity-60 mt-1">Track the approval status of your pending service request.</p>
            </div>
            <Link to={applicationsLink} className="text-[10px] uppercase tracking-widest font-bold text-[#C25E30] hover:underline">
              View All
            </Link>
          </div>
          <ApplicationProgress status={pendingApps[0].status} />
        </div>
      )}

      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#2D2A26]/10">
          <h2 className="text-2xl font-serif font-bold text-[#2D2A26]">Profile Information</h2>
          <button 
            disabled={saving}
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="text-[10px] uppercase tracking-widest font-bold text-[#C25E30] border border-[#C25E30] px-4 py-2 rounded-full hover:bg-[#C25E30] hover:text-white transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">First Name</label>
              <div className="text-[#2D2A26] font-bold text-lg">{user.firstName}</div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Last Name</label>
              <div className="text-[#2D2A26] font-bold text-lg">{user.lastName}</div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Email Address</label>
              <div className="text-[#2D2A26] font-bold text-lg">{user.email}</div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Phone Number</label>
              {editing ? (
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] text-sm font-bold"
                  placeholder="+1 234 567 8900"
                />
              ) : (
                <div className="text-[#2D2A26] font-bold text-lg opacity-80">{user.phone || 'Not provided'}</div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Physical Address</label>
            {editing ? (
              <textarea 
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] text-sm font-bold resize-none"
                rows={3}
                placeholder="Mbezi Msakuzi Kusini"
              />
            ) : (
              <div className="text-[#2D2A26] font-bold text-lg opacity-80">{user.address || 'Mbezi Msakuzi Kusini'}</div>
            )}
          </div>
        </div>
      </div>

      {/* Katiba / Constitution Banner */}
      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-1 block">Official Document / Nyaraka Rasmi</span>
          <h3 className="text-2xl font-serif font-bold text-[#2D2A26]">Katiba / Constitution</h3>
          <p className="text-xs opacity-70 mt-1 max-w-md">Access, read, and search the complete official constitution (Katiba & Kanuni 2024) for Maisha Plus Group members.</p>
        </div>
        <Link 
          to={
            user?.role === 'admin' 
              ? '/admin/constitution' 
              : user?.role && ['accountant', 'secretary', 'chairman'].includes(user.role) 
                ? '/staff/constitution' 
                : '/dashboard/constitution'
          } 
          className="bg-[#2D2A26] text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C25E30] transition-colors shrink-0 text-center"
        >
          Read Katiba
        </Link>
      </div>
    </div>
  );
}
