const fs = require('fs');
let code = fs.readFileSync('src/pages/dashboard/admin/ManageNews.tsx', 'utf8');

const oldForm = `          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Title</label>
            <input 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              type="text" 
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Content</label>
            <textarea 
              required
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              rows={4} 
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold resize-none"
            />
          </div>`;

const newForm = `          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Title</label>
            <input 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              type="text" 
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Venue (Optional)</label>
              <input 
                value={formData.venue}
                onChange={e => setFormData({...formData, venue: e.target.value})}
                type="text" 
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
                placeholder="e.g. Community Hall"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Date (Optional)</label>
              <input 
                value={formData.meetingDate}
                onChange={e => setFormData({...formData, meetingDate: e.target.value})}
                type="date" 
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Time (Optional)</label>
              <input 
                value={formData.meetingTime}
                onChange={e => setFormData({...formData, meetingTime: e.target.value})}
                type="time" 
                className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Main Agenda (Optional)</label>
            <textarea 
              value={formData.agenda}
              onChange={e => setFormData({...formData, agenda: e.target.value})}
              rows={2} 
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold opacity-60 mb-3">Brief Description</label>
            <textarea 
              required
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              rows={4} 
              className="w-full px-4 py-3 border border-[#2D2A26]/20 rounded-xl focus:outline-none focus:border-[#C25E30] bg-[#FAF9F6] font-bold resize-none"
            />
          </div>`;

code = code.replace(oldForm, newForm);
fs.writeFileSync('src/pages/dashboard/admin/ManageNews.tsx', code);
