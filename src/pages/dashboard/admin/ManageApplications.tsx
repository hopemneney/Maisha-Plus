import { useApplications, useUsers } from '../../../lib/useDbData';
import { dbApi } from '../../../lib/firestore';
import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { ServiceApplication } from '../../../types';

export default function ManageApplications() {
  const { applications: apps, loading: appsLoading, setApplications: setApps } = useApplications();
  const { users, loading: usersLoading } = useUsers();
  
  const handleStatusChange = async (id: string, status: ServiceApplication['status']) => {
    await dbApi.updateApplicationStatus(id, status);
    setApps(apps.map(app => app.id === id ? { ...app, status } : app));
  };

  if (appsLoading || usersLoading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="bg-white border border-[#2D2A26]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#2D2A26]/10 bg-[#FAF9F6]">
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Date</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Applicant</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Type</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Amount</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Status</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map(app => {
                const user = users.find(u => u.id === app.userId);
                return (
                  <tr key={app.id} className="border-b border-[#2D2A26]/5 last:border-0 hover:bg-[#FAF9F6] transition-colors">
                    <td className="px-6 py-5 text-sm font-bold opacity-80">{format(new Date(app.createdAt), 'MMM d, yy')}</td>
                    <td className="px-6 py-5 text-sm font-bold">
                      {user ? `${user.firstName} ${user.lastName}` : 'Unknown'}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold">{app.serviceType}</td>
                    <td className="px-6 py-5 text-sm font-bold">Tsh {app.requestedAmount.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full",
                        app.status.startsWith('Pending') && "bg-[#F2F0EB] text-[#2D2A26]",
                        app.status === 'Approved' && "bg-[#4A5D4A]/10 text-[#4A5D4A]",
                        app.status === 'Rejected' && "bg-[#C25E30]/10 text-[#C25E30]"
                      )}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 flex space-x-2">
                      {app.status.startsWith('Pending') && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'Approved')}
                            className="text-[10px] bg-[#4A5D4A] hover:bg-[#4A5D4A]/80 text-white px-4 py-2 rounded-xl uppercase tracking-widest font-bold transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusChange(app.id, 'Rejected')}
                            className="text-[10px] bg-transparent border border-[#C25E30] text-[#C25E30] hover:bg-[#C25E30] hover:text-white px-4 py-2 rounded-xl uppercase tracking-widest font-bold transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {apps.length === 0 && (
          <div className="p-12 text-center opacity-60 font-bold">No applications found.</div>
        )}
      </div>
    </div>
  );
}
