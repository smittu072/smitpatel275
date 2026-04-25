import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('student@studentportal.com');
  const [password, setPassword] = useState('Student@123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="card w-full max-w-md space-y-3" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-rose-600">{error}</p>}
        <input className="w-full border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-indigo-600 text-white rounded p-2">Sign In</button>
        <p className="text-xs text-slate-500">Admin: admin@studentportal.com / Admin@123</p>
      </form>
    </div>
  );
}
