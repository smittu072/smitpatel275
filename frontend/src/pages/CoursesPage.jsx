import { useEffect, useState } from 'react';
import api from '../api/client';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api.get('/student/courses').then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div className="card" key={course._id}>
          <h2 className="text-xl font-semibold">{course.name}</h2>
          <p>{course.department} - Semester {course.semester}</p>
          <ul className="mt-2 space-y-1">
            {course.subjects.map((s) => (
              <li key={s.code} className="text-sm">{s.code} - {s.name} ({s.instructor})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
