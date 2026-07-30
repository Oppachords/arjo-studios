import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Loading...</span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-stone-100">
            Arjo <span className="text-[#ff4500]">Admin</span>
          </h1>
          <p className="mt-2 text-sm text-stone-500 font-semibold">Portfolio management dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-900/50 border border-stone-800 rounded-sm p-8 space-y-6">
          {error && (
            <div className="px-4 py-3 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-stone-700 rounded-sm text-stone-100 focus:outline-none focus:border-[#ff4500] transition-colors"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-stone-700 rounded-sm text-stone-100 focus:outline-none focus:border-[#ff4500] transition-colors"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#ff4500] text-white font-black uppercase text-xs tracking-widest rounded-sm hover:bg-[#e03e00] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <a href="/" className="text-xs text-stone-600 hover:text-stone-400 transition-colors uppercase tracking-widest font-bold">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
