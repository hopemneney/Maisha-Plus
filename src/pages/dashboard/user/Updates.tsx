import { useNews } from '../../../lib/useDbData';
import { format } from 'date-fns';

export default function Updates() {
  const { news, loading } = useNews();
  
  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      {news.map(item => (
        <div key={item.id} className="bg-white p-8 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
          <time className="text-[10px] uppercase tracking-widest font-bold text-[#C25E30] mb-3 block">
            {format(new Date(item.createdAt), 'MMM d, yyyy')}
          </time>
          <h3 className="text-2xl font-serif font-bold tracking-tight text-[#2D2A26] mb-4">{item.title}</h3>
          {(item.venue || item.meetingDate || item.meetingTime || item.agenda) && (
            <div className="mb-6 p-4 bg-[#FAF9F6] border border-[#2D2A26]/5 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {item.venue && (
                  <div>
                    <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Venue</span>
                    <span className="font-bold">{item.venue}</span>
                  </div>
                )}
                {(item.meetingDate || item.meetingTime) && (
                  <div>
                    <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Date & Time</span>
                    <span className="font-bold">
                      {item.meetingDate ? new Date(item.meetingDate).toLocaleDateString() : ''} 
                      {item.meetingDate && item.meetingTime ? ' at ' : ''} 
                      {item.meetingTime || ''}
                    </span>
                  </div>
                )}
                {item.agenda && (
                  <div className="sm:col-span-2">
                    <span className="block opacity-50 text-[10px] uppercase tracking-widest font-bold">Agenda</span>
                    <span className="font-bold block mt-1">{item.agenda}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <p className="opacity-80 leading-relaxed whitespace-pre-wrap">{item.content}</p>
        </div>
      ))}
    </div>
  );
}
