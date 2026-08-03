const fs = require('fs');
let code = fs.readFileSync('src/pages/public/News.tsx', 'utf8');

const oldContent = `              {n.imageUrl && (
                <div className="w-full h-64 overflow-hidden rounded-xl mb-8">
                  <img src={n.imageUrl} alt={n.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="opacity-80 text-lg leading-relaxed text-[#2D2A26]">{n.content}</p>`;

const newContent = `              {n.imageUrl && (
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

              <div className="opacity-80 text-lg leading-relaxed text-[#2D2A26] whitespace-pre-wrap">{n.content}</div>`;

code = code.replace(oldContent, newContent);
fs.writeFileSync('src/pages/public/News.tsx', code);

// Now patch Updates.tsx
let updatesCode = fs.readFileSync('src/pages/dashboard/user/Updates.tsx', 'utf8');

const oldUpdatesContent = `          <p className="opacity-80 leading-relaxed">{item.content}</p>`;

const newUpdatesContent = `          {(item.venue || item.meetingDate || item.meetingTime || item.agenda) && (
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
          <p className="opacity-80 leading-relaxed whitespace-pre-wrap">{item.content}</p>`;

updatesCode = updatesCode.replace(oldUpdatesContent, newUpdatesContent);
fs.writeFileSync('src/pages/dashboard/user/Updates.tsx', updatesCode);
