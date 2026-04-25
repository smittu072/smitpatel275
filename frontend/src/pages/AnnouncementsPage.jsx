import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AnnouncementsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', audience: 'all' });
  const { user } = useAuth();

  const load = () => api.get('/announcements').then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    await api.post('/announcements', form);
    setForm({ title: '', message: '', audience: 'all' });
    load();
  };

  return (
    <div className="space-y-4">
      {user?.role === 'admin' && (
        <form className="card space-y-2" onSubmit={onCreate}>
          <input className="w-full border rounded p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="w-full border rounded p-2" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <select className="border rounded p-2" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}>
            <option value="all">All</option><option value="student">Students</option><option value="admin">Admins</option>
          </select>
          <button className="bg-indigo-600 text-white rounded p-2">Post Notice</button>
        </form>
      )}
      {list.map((a) => (
        <div key={a._id} className="card"><h3 className="font-semibold">{a.title}</h3><p>{a.message}</p></div>
      ))}
    </div>
  );
}
