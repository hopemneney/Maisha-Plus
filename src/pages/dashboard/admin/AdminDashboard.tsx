import { useUsers, useApplications, useProjects } from '../../../lib/useDbData';

export default function AdminDashboard() {
  const { users } = useUsers();
  const { applications } = useApplications();
  const { projects } = useProjects();

  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Total Applications', value: applications.length },
    { label: 'Pending Apps', value: applications.filter(a => a.status === 'Pending').length },
    { label: 'Total Projects', value: projects.length },
  ];

  return (
    <div className="max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-8 border border-[#2D2A26]/10 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px]">
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">{s.label}</div>
            <div className="text-4xl font-serif font-black tracking-tight text-[#2D2A26] mt-4">{s.value}</div>
          </div>
        ))}
      </div>
      
      {/* Editorial Dashboard Card Example */}
      <div className="bg-[#2D2A26] text-white p-8 rounded-2xl">
        <h3 className="font-serif text-2xl mb-2">Platform Overview</h3>
        <p className="opacity-70 text-sm max-w-lg mb-6">Manage all operational metrics, review incoming applications, and update community members from your centralized dashboard.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">System Status</span>
              <div className="text-xl font-serif italic mt-2 text-green-400">All Systems Operational</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl border border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Latest Backup</span>
              <div className="text-xl font-serif italic mt-2 text-white/90">Today, 02:00 AM</div>
            </div>
        </div>
      </div>
    </div>
  );
}
