import { useEffect, useState } from 'react';
import api from '../api/client';

export default function AdminPage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({ student: '', subjectCode: '', totalClasses: 0, attendedClasses: 0 });
  const [grade, setGrade] = useState({ student: '', subjectCode: '', subjectName: '', marksObtained: 0, totalMarks: 100, gradePoint: 0 });

  useEffect(() => {
    api.get('/admin/students').then((r) => setStudents(r.data));
  }, []);

  const submitAttendance = async (e) => {
    e.preventDefault();
    await api.post('/admin/attendance', attendance);
  };

  const submitGrade = async (e) => {
    e.preventDefault();
    await api.post('/admin/grades', grade);
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Students</h2>
        {students.map((s) => <p key={s._id}>{s.name} ({s.studentId})</p>)}
      </div>
      <form className="card grid md:grid-cols-5 gap-2" onSubmit={submitAttendance}>
        <select className="border rounded p-2" onChange={(e) => setAttendance({ ...attendance, student: e.target.value })}>{students.map((s) => <option value={s._id} key={s._id}>{s.name}</option>)}</select>
        <input className="border rounded p-2" placeholder="Subject" onChange={(e) => setAttendance({ ...attendance, subjectCode: e.target.value })} />
        <input type="number" className="border rounded p-2" placeholder="Total" onChange={(e) => setAttendance({ ...attendance, totalClasses: Number(e.target.value) })} />
        <input type="number" className="border rounded p-2" placeholder="Attended" onChange={(e) => setAttendance({ ...attendance, attendedClasses: Number(e.target.value) })} />
        <button className="bg-indigo-600 text-white rounded p-2">Save Attendance</button>
      </form>
      <form className="card grid md:grid-cols-7 gap-2" onSubmit={submitGrade}>
        <select className="border rounded p-2" onChange={(e) => setGrade({ ...grade, student: e.target.value })}>{students.map((s) => <option value={s._id} key={s._id}>{s.name}</option>)}</select>
        <input className="border rounded p-2" placeholder="Code" onChange={(e) => setGrade({ ...grade, subjectCode: e.target.value })} />
        <input className="border rounded p-2" placeholder="Subject" onChange={(e) => setGrade({ ...grade, subjectName: e.target.value })} />
        <input type="number" className="border rounded p-2" placeholder="Marks" onChange={(e) => setGrade({ ...grade, marksObtained: Number(e.target.value) })} />
        <input type="number" className="border rounded p-2" placeholder="Total" onChange={(e) => setGrade({ ...grade, totalMarks: Number(e.target.value) })} />
        <input type="number" step="0.1" className="border rounded p-2" placeholder="GP" onChange={(e) => setGrade({ ...grade, gradePoint: Number(e.target.value) })} />
        <button className="bg-indigo-600 text-white rounded p-2">Save Grade</button>
      </form>
    </div>
  );
}
