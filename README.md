# Student Portal (Full Stack)

A full-featured Student Portal web application with React + Tailwind frontend and Node.js + Express + MongoDB backend.

## Features
- JWT authentication (student/admin roles)
- Student dashboard (profile, attendance, grades, announcements)
- Attendance analytics with subject-wise percentage and overall percentage
- Grades with GPA and overall percentage calculation
- Course/subject catalog with instructor details
- Assignment creation and student submissions (file upload)
- Admin announcement posting with optional email notification dispatch
- Profile edit + profile picture upload
- Search/filter in grades
- Dark mode toggle
- Mobile-responsive sidebar/dashboard layout

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, Multer, Nodemailer
- Database: MongoDB

## Project Structure
```
backend/
frontend/
```

## Database Schema (MongoDB/Mongoose)

### User
- `name: String`
- `email: String (unique)`
- `password: String (hashed with bcrypt)`
- `role: 'student' | 'admin'`
- `studentId: String`
- `course: String`
- `semester: Number`
- `profilePicture: String`
- `phone: String`
- `bio: String`

### Course
- `name: String`
- `department: String`
- `semester: Number`
- `subjects[]`
  - `code: String`
  - `name: String`
  - `instructor: String`
  - `credits: Number`

### Attendance
- `student: ObjectId(User)`
- `subjectCode: String`
- `totalClasses: Number`
- `attendedClasses: Number`

### Grade
- `student: ObjectId(User)`
- `subjectCode: String`
- `subjectName: String`
- `marksObtained: Number`
- `totalMarks: Number`
- `gradePoint: Number`

### Assignment
- `title: String`
- `subjectCode: String`
- `description: String`
- `dueDate: Date`
- `createdBy: ObjectId(User)`
- `submissions[]`
  - `student: ObjectId(User)`
  - `fileUrl: String`
  - `submittedAt: Date`
  - `status: String`

### Announcement
- `title: String`
- `message: String`
- `audience: 'all' | 'student' | 'admin'`
- `createdBy: ObjectId(User)`

## Setup Instructions

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```
Backend runs at `http://localhost:5000`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

## Default Seed Credentials
- Student: `student@studentportal.com` / `Student@123`
- Admin: `admin@studentportal.com` / `Admin@123`

## REST API Overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/student/dashboard`
- `GET /api/student/attendance`
- `GET /api/student/grades`
- `GET /api/student/courses`
- `PUT /api/student/profile`
- `GET /api/assignments`
- `POST /api/assignments` (admin)
- `POST /api/assignments/:id/submit` (student)
- `GET /api/announcements`
- `POST /api/announcements` (admin)
- `GET /api/admin/students` (admin)
- `POST /api/admin/attendance` (admin)
- `POST /api/admin/grades` (admin)
- `POST /api/admin/courses` (admin)
