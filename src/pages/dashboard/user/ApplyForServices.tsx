import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../lib/auth';
import { dbApi } from '../../../lib/firestore';
import { ServiceApplication } from '../../../types';

export default function ApplyForServices() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: 'Loan',
    requestedAmount: '',
    purpose: ''
  });

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    const newApp: ServiceApplication = {
      id: Math.random().toString(36).substring(7),
      userId: user.id,
      serviceType: formData.serviceType,
      requestedAmount: Number(formData.requestedAmount),
      purpose: formData.purpose,
      status: 'Pending Accountant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await dbApi.addApplication(newApp);
    setSubmitting(false);
    navigate(user.role === 'user' ? '/dashboard/applications' : '/staff/applications');
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-[#2D2A26] mb-8 pb-6 border-b border-[#2D2A26]/10">Apply for Service</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Service Type</label>
            <select 
              value={formData.serviceType}
              onChange={e => setFormData({...formData, serviceType: e.target.value})}
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
            >
              <option value="Loan">Financial Loan</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Requested Amount (Tsh)</label>
            <input 
              type="amount" 
              required
              min="100"
              value={formData.requestedAmount}
              onChange={e => setFormData({...formData, requestedAmount: e.target.value})}
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
              placeholder="e.g. 5000"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Purpose of Request</label>
            <textarea 
              required
              rows={4}
              value={formData.purpose}
              onChange={e => setFormData({...formData, purpose: e.target.value})}
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold resize-none"
              placeholder="Describe how these funds will be used..."
            />
          </div>
          <button type="submit" disabled={submitting} className="bg-[#2D2A26] text-white px-8 py-4 uppercase tracking-widest font-bold text-xs rounded-xl hover:bg-[#2D2A26]/80 transition-colors disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
