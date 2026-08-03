const fs = require('fs');
let code = fs.readFileSync('src/pages/dashboard/admin/ManageNews.tsx', 'utf8');

code = code.replace(
  "const [formData, setFormData] = useState({ title: '', content: '' });",
  "const [formData, setFormData] = useState({ title: '', content: '', venue: '', meetingDate: '', meetingTime: '', agenda: '' });"
);

code = code.replace(
  "    const newItem = {\n      id: Math.random().toString(36).substring(7),\n      title: formData.title,\n      content: formData.content,\n      authorId: user.id,\n      createdAt: new Date().toISOString()\n    };",
  `    const newItem = {
      id: Math.random().toString(36).substring(7),
      title: formData.title,
      content: formData.content,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      ...(formData.venue && { venue: formData.venue }),
      ...(formData.meetingDate && { meetingDate: formData.meetingDate }),
      ...(formData.meetingTime && { meetingTime: formData.meetingTime }),
      ...(formData.agenda && { agenda: formData.agenda }),
    };`
);

code = code.replace(
  "setFormData({ title: '', content: '' });",
  "setFormData({ title: '', content: '', venue: '', meetingDate: '', meetingTime: '', agenda: '' });"
);

const formReplacement = `          <div>
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

code = code.replace(/<div>\s*<label className="block text-\[10px\] uppercase tracking-widest font-bold opacity-60 mb-3">Title[\s\S]*?<\/textarea>\s*<\/div>/, formReplacement);

fs.writeFileSync('src/pages/dashboard/admin/ManageNews.tsx', code);
