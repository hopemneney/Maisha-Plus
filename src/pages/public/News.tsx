import { useNews } from '../../lib/useDbData';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

export default function News() {
  const { t } = useTranslation();
  const { news, loading } = useNews();
  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">{t('news.loading')}</div>;
  return (
    <div className="py-24 px-6 lg:px-12 flex-1">
      <div className="max-w-4xl mx-auto">
        <span className="text-[#C25E30] uppercase tracking-widest font-bold text-[10px] mb-2 block">{t('home.updates')}</span>
        <h1 className="text-5xl font-serif font-black tracking-tight text-[#2D2A26] mb-16 uppercase">{t('news.title')}</h1>
        
        <div className="space-y-12">
          {news.map(n => (
            <article key={n.id} className="bg-white p-8 md:p-12 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
              <time className="text-[10px] uppercase tracking-widest font-bold text-[#C25E30] mb-4 block">
                {format(new Date(n.createdAt), 'MMMM d, yyyy')}
              </time>
              <h2 className="text-3xl font-serif font-bold tracking-tight text-[#2D2A26] mb-6">{n.title}</h2>
              {n.imageUrl && (
                <div className="w-full h-64 overflow-hidden rounded-xl mb-8">
                  <img src={n.imageUrl} alt={n.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              {(n.venue || n.meetingDate || n.meetingTime || n.agenda) && (
                <div className="mb-8 p-6 bg-[#FAF9F6] border border-[#2D2A26]/10 rounded-xl space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Meeting Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {n.venue && (
                      <div>
                        <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Venue</span>
                        <span className="font-bold">{n.venue}</span>
                      </div>
                    )}
                    {(n.meetingDate || n.meetingTime) && (
                      <div>
                        <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Date & Time</span>
                        <span className="font-bold">
                          {n.meetingDate ? new Date(n.meetingDate).toLocaleDateString() : ''} 
                          {n.meetingDate && n.meetingTime ? ' at ' : ''} 
                          {n.meetingTime || ''}
                        </span>
                      </div>
                    )}
                    {n.agenda && (
                      <div className="md:col-span-2 mt-2">
                        <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Main Agenda</span>
                        <span className="font-bold leading-relaxed block mt-1">{n.agenda}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="opacity-80 text-lg leading-relaxed text-[#2D2A26] whitespace-pre-wrap">{n.content}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
