import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

export default function GradesPage() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState({ detailed: [], gpa: 0, percentage: 0 });

  useEffect(() => {
    api.get('/student/grades').then((res) => setData(res.data));
  }, []);

  const filtered = useMemo(
    () => data.detailed.filter((g) => g.subjectName.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  );

  return (
    <div className="card space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Grades</h2>
        <input className="border rounded p-2" placeholder="Search subject" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <table className="w-full text-left">
        <thead><tr><th>Subject</th><th>Marks</th><th>%</th><th>GP</th></tr></thead>
        <tbody>
          {filtered.map((g) => (
            <tr key={g.subjectCode} className="border-t"><td>{g.subjectName}</td><td>{g.marksObtained}/{g.totalMarks}</td><td>{g.percentage.toFixed(2)}</td><td>{g.gradePoint}</td></tr>
          ))}
        </tbody>
      </table>
      <p>GPA: {data.gpa} | Overall Percentage: {data.percentage}%</p>
    </div>
  );
}
