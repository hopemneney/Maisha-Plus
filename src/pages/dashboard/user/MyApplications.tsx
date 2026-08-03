import { useUserApplications } from '../../../lib/useDbData';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { ApplicationProgress } from '../../../components/ui/ApplicationProgress';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/auth';

export default function MyApplications() {
  const { user } = useAuth();
  const { applications, loading } = useUserApplications();
  
  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;

  const applyLink = user?.role === 'user' ? '/dashboard/apply' : '/staff/apply';

  return (
    <div className="max-w-4xl space-y-8">
      {applications.length === 0 ? (
        <div className="bg-white border border-[#2D2A26]/10 rounded-2xl shadow-sm p-12 text-center">
          <p className="opacity-60 font-bold mb-4">You have not submitted any applications yet.</p>
          <Link to={applyLink} className="inline-block bg-[#2D2A26] text-white px-6 py-3 uppercase tracking-widest font-bold text-xs rounded-xl hover:bg-[#2D2A26]/80 transition-colors">
            Apply Now
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map(app => (
            <div key={app.id} className="bg-white border border-[#2D2A26]/10 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 border-b border-[#2D2A26]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#FAF9F6]">
                <div>
                  <h4 className="text-xl font-bold font-serif text-[#2D2A26]">{app.serviceType}</h4>
                  <p className="text-sm opacity-60 mt-1">Submitted on {format(new Date(app.createdAt), 'MMM d, yyyy')}</p>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-xl font-bold text-[#C25E30]">Tsh {app.requestedAmount.toLocaleString()}</span>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">Requested Amount</p>
                </div>
              </div>
              
              <div className="px-6 md:px-12 py-10">
                <ApplicationProgress status={app.status} />
              </div>

              {app.status === 'Approved' && (
                <div className="p-4 bg-[#4A5D4A]/5 border-t border-[#4A5D4A]/10 flex justify-end">
                  <button className="text-[#4A5D4A] hover:opacity-80 flex items-center text-xs font-bold uppercase tracking-widest transition-opacity">
                    <Download className="w-4 h-4 mr-2" /> Download Decision Letter
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
