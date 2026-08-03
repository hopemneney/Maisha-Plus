import { useState } from 'react';
import { useUsers } from '../../../lib/useDbData';
import { dbApi } from '../../../lib/firestore';
import { auth } from '../../../lib/firebase';
import { format } from 'date-fns';
import { Role, User } from '../../../types';
import { Trash2, Edit2, X, Check } from 'lucide-react';

export default function ManageUsers() {
  const { users, loading, setUsers } = useUsers();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await dbApi.updateUser(userId, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Failed to update user role", error);
      alert("Failed to update user role. Check permissions.");
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user? This will delete them from the database and authentication.")) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      let backendSuccess = false;
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          backendSuccess = true;
        } else {
          console.error("Backend delete failed with status:", res.status);
        }
      } catch (fetchErr) {
        console.error("Fetch to backend failed", fetchErr);
      }

      if (!backendSuccess) {
        console.log("Falling back to Firestore delete directly.");
        await dbApi.deleteUser(userId);
      }
      
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user. Check permissions.");
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditForm({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleSaveEdit = async (userId: string) => {
    try {
      await dbApi.updateUser(userId, editForm);
      setUsers(users.map(u => u.id === userId ? { ...u, ...editForm } : u));
      setEditingUserId(null);
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to update user. Check permissions.");
    }
  };

  if (loading) return <div className="p-12 text-center text-sm font-bold uppercase tracking-widest opacity-50">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <div className="bg-white border border-[#2D2A26]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#2D2A26]/10 bg-[#FAF9F6]">
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Name</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Email</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Role</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40">Joined</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold opacity-40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isEditing = editingUserId === u.id;
                return (
                  <tr key={u.id} className="border-b border-[#2D2A26]/5 last:border-0 hover:bg-[#FAF9F6] transition-colors">
                    <td className="px-6 py-5 text-sm font-bold">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <input 
                            className="px-2 py-1 border border-[#2D2A26]/20 rounded-md w-24"
                            value={editForm.firstName || ''}
                            onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                          />
                          <input 
                            className="px-2 py-1 border border-[#2D2A26]/20 rounded-md w-24"
                            value={editForm.lastName || ''}
                            onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                          />
                        </div>
                      ) : (
                        `${u.firstName} ${u.lastName}`
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold opacity-70">
                      {isEditing ? (
                         <input 
                         className="px-2 py-1 border border-[#2D2A26]/20 rounded-md w-full"
                         value={editForm.email || ''}
                         onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                       />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <select 
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-[#F2F0EB] text-[#2D2A26] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4A5D4A]"
                      >
                        <option value="user">USER</option>
                        <option value="accountant">ACCOUNTANT</option>
                        <option value="secretary">SECRETARY</option>
                        <option value="chairman">CHAIRMAN</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold opacity-80">{format(new Date(u.createdAt), 'MMM d, yyyy')}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing ? (
                          <>
                            <button onClick={() => handleSaveEdit(u.id)} className="p-1.5 bg-[#4A5D4A] text-white rounded-md hover:bg-[#4A5D4A]/80 transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => setEditingUserId(null)} className="p-1.5 bg-gray-200 text-[#2D2A26] rounded-md hover:bg-gray-300 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(u)} className="p-1.5 text-[#2D2A26] hover:bg-[#2D2A26]/10 rounded-md transition-colors" title="Edit User">
                              <Edit2 className="w-4 h-4 opacity-70" />
                            </button>
                            <button onClick={() => handleDelete(u.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete User">
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
