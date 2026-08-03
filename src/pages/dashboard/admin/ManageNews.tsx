import { useState } from 'react';
import { useNews } from '../../../lib/useDbData';
import { dbApi } from '../../../lib/firestore';
import { useAuth } from '../../../lib/auth';
import { format } from 'date-fns';
import { NewsItem } from '../../../types';
import { Trash2, Edit2, X, Check } from 'lucide-react';

export default function ManageNews() {
  const { user } = useAuth();
  const { news, loading, setNews } = useNews();
  const [formData, setFormData] = useState({ title: '', content: '', venue: '', meetingDate: '', meetingTime: '', agenda: '' });
  const [submitting, setSubmitting] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<NewsItem>>({});

  const handleSubmit = async (e: import("react").FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSubmitting(true);
    const newItem = {
      id: Math.random().toString(36).substring(7),
      title: formData.title,
      content: formData.content,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      ...(formData.venue && { venue: formData.venue }),
      ...(formData.meetingDate && { meetingDate: formData.meetingDate }),
      ...(formData.meetingTime && { meetingTime: formData.meetingTime }),
      ...(formData.agenda && { agenda: formData.agenda }),
    };
    await dbApi.addNews(newItem);
    
    setNews([newItem, ...news]);
    setFormData({ title: '', content: '', venue: '', meetingDate: '', meetingTime: '', agenda: '' });
    setSubmitting(false);
  };

  const handleDelete = async (newsId: string) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    try {
      await dbApi.deleteNews(newsId);
      setNews(news.filter(n => n.id !== newsId));
    } catch (error) {
      console.error("Failed to delete news", error);
      alert("Failed to delete news. Check permissions.");
    }
  };

  const handleEditClick = (n: NewsItem) => {
    setEditingNewsId(n.id);
    setEditForm({ title: n.title, content: n.content });
  };

  const handleSaveEdit = async (newsId: string) => {
    try {
      await dbApi.updateNews(newsId, editForm);
      setNews(news.map(n => n.id === newsId ? { ...n, ...editForm } : n));
      setEditingNewsId(null);
    } catch (error) {
      console.error("Failed to update news", error);
      alert("Failed to update news. Check permissions.");
    }
  };

  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;

  return (
    <div className="max-w-5xl space-y-8">
      <div className="bg-white p-8 md:p-10 border border-[#2D2A26]/10 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-[#2D2A26] mb-8 pb-6 border-b border-[#2D2A26]/10">Post Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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
          </div>
          <button type="submit" disabled={submitting} className="bg-[#2D2A26] text-white px-8 py-4 uppercase tracking-widest font-bold text-xs rounded-xl hover:bg-[#2D2A26]/80 transition-colors disabled:opacity-50">
            {submitting ? 'Publishing...' : 'Publish News'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-[#2D2A26]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#2D2A26]/10 bg-[#FAF9F6]">
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Date</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Title / Content</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map(n => {
                const isEditing = editingNewsId === n.id;
                return (
                  <tr key={n.id} className="border-b border-[#2D2A26]/5 last:border-0 hover:bg-[#FAF9F6] transition-colors">
                    <td className="px-6 py-5 text-sm font-bold opacity-80 whitespace-nowrap align-top">{format(new Date(n.createdAt), 'MMM d, yyyy')}</td>
                    <td className="px-6 py-5 align-top">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input 
                            className="w-full px-3 py-2 border border-[#2D2A26]/20 rounded-lg text-sm font-bold"
                            value={editForm.title || ''}
                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            placeholder="Title"
                          />
                          <textarea 
                            className="w-full px-3 py-2 border border-[#2D2A26]/20 rounded-lg text-sm resize-none"
                            rows={3}
                            value={editForm.content || ''}
                            onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                            placeholder="Content"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-bold mb-1">{n.title}</div>
                          <div className="text-xs opacity-70 line-clamp-2">{n.content}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right align-top">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button onClick={() => handleSaveEdit(n.id)} className="p-1.5 bg-[#4A5D4A] text-white rounded-md hover:bg-[#4A5D4A]/80 transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => setEditingNewsId(null)} className="p-1.5 bg-gray-200 text-[#2D2A26] rounded-md hover:bg-gray-300 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(n)} className="p-1.5 text-[#2D2A26] hover:bg-[#2D2A26]/10 rounded-md transition-colors" title="Edit News">
                              <Edit2 className="w-4 h-4 opacity-70" />
                            </button>
                            <button onClick={() => handleDelete(n.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete News">
                              <Trash2 className="w-4 h-4 opacity-70" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
