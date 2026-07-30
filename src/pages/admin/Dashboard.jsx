import { Link } from 'react-router-dom';
import { useAllProjectsAdmin } from '../../hooks/useProjects';
import { api } from '../../lib/api';

export default function AdminDashboard() {
  const { projects, loading, error, reload } = useAllProjectsAdmin();

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.deleteProject(id);
      reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const featured = projects.filter((p) => p.isFeatured);
  const allWorks = projects;

  if (loading) {
    return <p className="text-stone-500 text-sm">Loading projects...</p>;
  }

  if (error) {
    return (
      <div className="border border-red-800 bg-red-950/30 rounded-sm p-6">
        <p className="text-red-300 font-semibold">{error}</p>
        <p className="text-stone-500 text-sm mt-2">
          Make sure Supabase is configured and seed data is loaded. See SETUP.md.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="text-stone-500 text-sm mt-1">{projects.length} projects total</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="px-5 py-3 bg-[#ff4500] text-white font-black uppercase text-xs tracking-widest rounded-sm hover:bg-[#e03e00] transition-colors"
        >
          + New Project
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-500 mb-4">
          Selected Works ({featured.length})
        </h2>
        <ProjectTable projects={featured} onDelete={handleDelete} emptyMessage="No featured projects yet." />
      </section>

      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-500 mb-4">
          All Works ({allWorks.length})
        </h2>
        <ProjectTable projects={allWorks} onDelete={handleDelete} emptyMessage="No projects yet." />
      </section>
    </div>
  );
}

function ProjectTable({ projects, onDelete, emptyMessage }) {
  if (projects.length === 0) {
    return <p className="text-stone-600 text-sm py-8 text-center border border-stone-800 rounded-sm">{emptyMessage}</p>;
  }

  return (
    <div className="border border-stone-800 rounded-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-800 bg-stone-900/50">
            <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-stone-500">Cover</th>
            <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-stone-500">Title</th>
            <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-stone-500 hidden md:table-cell">Featured</th>
            <th className="text-left px-4 py-3 text-xs font-black uppercase tracking-widest text-stone-500 hidden md:table-cell">Images</th>
            <th className="text-right px-4 py-3 text-xs font-black uppercase tracking-widest text-stone-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-stone-800/50 hover:bg-stone-900/30 transition-colors">
              <td className="px-4 py-3">
                <img
                  src={project.coverImageUrl}
                  alt={project.title}
                  className="w-12 h-12 object-cover rounded-sm border border-stone-700"
                />
              </td>
              <td className="px-4 py-3">
                <p className="font-bold text-stone-100">{project.title}</p>
                <p className="text-xs text-stone-500 mt-0.5">{project.slug}</p>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                {project.isFeatured ? (
                  <span className="text-[10px] px-2 py-0.5 bg-[#ff4500]/20 text-[#ff4500] font-bold uppercase rounded-sm">Yes</span>
                ) : (
                  <span className="text-stone-600 text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-stone-400 hidden md:table-cell">
                {project.galleryImages?.length || 0}
              </td>
              <td className="px-4 py-3 text-right space-x-2">
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className="inline-block px-3 py-1.5 border border-stone-700 text-stone-300 font-bold uppercase text-[10px] tracking-widest rounded-sm hover:border-[#ff4500] hover:text-[#ff4500] transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(project.id, project.title)}
                  className="px-3 py-1.5 border border-red-900 text-red-400 font-bold uppercase text-[10px] tracking-widest rounded-sm hover:bg-red-950 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
