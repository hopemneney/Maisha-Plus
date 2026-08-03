import { useState } from 'react';
import { useAuth } from '../../../lib/auth';
import { dbApi } from '../../../lib/firestore';
import { useApplications, useUsers } from '../../../lib/useDbData';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { Check, X } from 'lucide-react';
import { ApplicationStatus } from '../../../types';

export default function StaffDashboard() {
  const { user } = useAuth();
  const { applications, loading: appsLoading } = useApplications();
  const { users, loading: usersLoading } = useUsers();
  const [processing, setProcessing] = useState<string | null>(null);

  if (!user || appsLoading || usersLoading) {
    return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;
  }

  // Determine what status to look for based on role
  let targetStatus = '';
  let nextStatus: ApplicationStatus = 'Approved';
  let rejectStatus: ApplicationStatus = 'Rejected';
  
  if (user.role === 'accountant') {
    targetStatus = 'Pending Accountant';
    nextStatus = 'Pending Secretary';
  } else if (user.role === 'secretary') {
    targetStatus = 'Pending Secretary';
    nextStatus = 'Pending Chairman';
  } else if (user.role === 'chairman') {
    targetStatus = 'Pending Chairman';
    nextStatus = 'Approved';
  }

  // We also accept 'Pending' as 'Pending Accountant'
  const pendingApps = applications.filter(app => app.status === targetStatus || (targetStatus === 'Pending Accountant' && app.status === 'Pending'));

  const handleApprove = async (id: string) => {
    setProcessing(id);
    await dbApi.updateApplicationStatus(id, nextStatus);
    setProcessing(null);
    window.location.reload();
  };

  const handleReject = async (id: string) => {
    setProcessing(id);
    await dbApi.updateApplicationStatus(id, rejectStatus);
    setProcessing(null);
    window.location.reload();
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-[#2D2A26] mb-2">
          {user.role === 'accountant' && 'Accountant Portal'}
          {user.role === 'secretary' && 'Secretary Portal'}
          {user.role === 'chairman' && 'Chairman Portal'}
        </h2>
        <p className="text-sm opacity-60 mb-8">Review and approve pending applications.</p>
        
        {pendingApps.length === 0 ? (
          <div className="p-12 text-center opacity-60 font-bold border-2 border-dashed border-[#2D2A26]/10 rounded-xl">
            No applications waiting for your approval.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#2D2A26]/10 bg-[#FAF9F6]">
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Date</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Applicant</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Type & Amount</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Purpose</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApps.map(app => {
                  const applicant = users.find(u => u.id === app.userId);
                  return (
                  <tr key={app.id} className="border-b border-[#2D2A26]/5 last:border-0 hover:bg-[#FAF9F6] transition-colors">
                    <td className="px-6 py-5 text-sm font-bold opacity-80 whitespace-nowrap">
                      {format(new Date(app.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold opacity-80 whitespace-nowrap">
                      {applicant ? `${applicant.firstName} ${applicant.lastName}` : 'Unknown User'}
                    </td>
                    <td className="px-6 py-5 text-sm">
                      <div className="font-bold">{app.serviceType}</div>
                      <div className="text-[#C25E30] font-bold">Tsh {app.requestedAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-5 text-sm opacity-80 max-w-xs truncate">
                      {app.purpose}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          disabled={processing === app.id}
                          onClick={() => handleApprove(app.id)}
                          className="flex items-center gap-1 bg-[#4A5D4A]/10 text-[#4A5D4A] hover:bg-[#4A5D4A] hover:text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-colors disabled:opacity-50"
                        >
                          <Check className="w-3 h-3" /> {processing === app.id ? '...' : 'Approve'}
                        </button>
                        <button
                          disabled={processing === app.id}
                          onClick={() => handleReject(app.id)}
                          className="flex items-center gap-1 bg-[#C25E30]/10 text-[#C25E30] hover:bg-[#C25E30] hover:text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-colors disabled:opacity-50"
                        >
                          <X className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
