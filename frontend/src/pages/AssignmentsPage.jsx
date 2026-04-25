import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AssignmentsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', subjectCode: '', dueDate: '' });
  const { user } = useAuth();

  const load = () => api.get('/assignments').then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const createAssignment = async (e) => {
    e.preventDefault();
    await api.post('/assignments', form);
    setForm({ title: '', subjectCode: '', dueDate: '' });
    load();
  };

  const submit = async (id, file) => {
    const fd = new FormData();
    fd.append('assignment', file);
    await api.post(`/assignments/${id}/submit`, fd);
    load();
  };

  return (
    <div className="space-y-4">
      {user?.role === 'admin' && (
        <form className="card grid md:grid-cols-4 gap-2" onSubmit={createAssignment}>
          <input className="border rounded p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="border rounded p-2" placeholder="Subject code" value={form.subjectCode} onChange={(e) => setForm({ ...form, subjectCode: e.target.value })} />
          <input className="border rounded p-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <button className="bg-indigo-600 text-white rounded p-2">Create</button>
        </form>
      )}
      {list.map((a) => (
        <div key={a._id} className="card">
          <h3 className="font-semibold">{a.title}</h3>
          <p>{a.subjectCode} | Due: {new Date(a.dueDate).toLocaleDateString()}</p>
          {user?.role === 'student' && (
            <div className="mt-2">
              <p>Status: {a.submissionStatus}</p>
              <input type="file" onChange={(e) => e.target.files[0] && submit(a._id, e.target.files[0])} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
