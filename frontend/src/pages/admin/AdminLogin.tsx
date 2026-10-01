import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { adminAuth } from '../../services/adminAuth';

export function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('ShieldMail@2026');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAuth.login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712]">
      <form onSubmit={handleLogin} className="w-full max-w-sm cyber-card p-8 animate-slideUp">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center shadow-cyber">
            <ShieldCheck size={28} className="text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-6">Admin Panel</h1>

        {error && <div className="p-3 mb-4 rounded-lg bg-red-950/30 border border-red-900 text-red-400 text-xs text-center">{error}</div>}

        <div className="space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="cyber-input pl-9"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cyber-input pl-9"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="w-full btn-solid py-3 justify-center text-sm">Sign In</button>
        </div>
      </form>
    </div>
  );
}
