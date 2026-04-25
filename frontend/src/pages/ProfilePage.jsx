import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', bio: user?.bio || '' });

  const save = async (e) => {
    e.preventDefault();
    const { data } = await api.put('/student/profile', form);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  const onUpload = async (file) => {
    const fd = new FormData();
    fd.append('profilePicture', file);
    const { data } = await api.put('/student/profile', fd);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  return (
    <form className="card space-y-3" onSubmit={save}>
      <h2 className="text-xl font-semibold">Profile</h2>
      {user?.profilePicture && <img src={`http://localhost:5000${user.profilePicture}`} alt="profile" className="w-20 h-20 rounded-full" />}
      <input className="w-full border rounded p-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="w-full border rounded p-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
      <textarea className="w-full border rounded p-2" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" />
      <input type="file" onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
      <button className="bg-indigo-600 text-white rounded p-2">Save</button>
    </form>
  );
}
