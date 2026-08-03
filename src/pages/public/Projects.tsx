import { useProjects } from '../../lib/useDbData';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();
  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">{t('projects.loading')}</div>;
  return (
    <div className="py-24 px-6 lg:px-12 flex-1 bg-[#F2F0EB]">
      <div className="max-w-7xl mx-auto">
        <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.initiatives')}</span>
        <h1 className="text-5xl font-serif font-black tracking-tight text-[#2D2A26] mb-12 uppercase">{t('projects.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(p => (
            <div key={p.id} className="bg-white border border-[#2D2A26]/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 text-[#2D2A26] mb-3">
                  {t('projects.status')}: {p.status}
                </span>
                <h3 className="text-2xl font-serif font-bold tracking-tight mb-3">{p.title}</h3>
                <p className="opacity-70 text-sm leading-relaxed flex-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
