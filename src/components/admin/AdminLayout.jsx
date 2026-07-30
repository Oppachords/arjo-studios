import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100">
      <header className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/admin/dashboard" className="text-lg font-black uppercase tracking-tight">
            Arjo <span className="text-[#ff4500]">Admin</span>
          </Link>
          <nav className="hidden sm:flex gap-6 text-xs font-bold uppercase tracking-widest text-stone-500">
            <Link to="/admin/dashboard" className="hover:text-stone-100 transition-colors">Dashboard</Link>
            <Link to="/admin/projects/new" className="hover:text-stone-100 transition-colors">New Project</Link>
            <Link to="/" className="hover:text-stone-100 transition-colors">View Site</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-500 hidden sm:inline">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-stone-700 text-stone-300 font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500] transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
