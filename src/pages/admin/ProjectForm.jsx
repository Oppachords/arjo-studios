import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageManager from '../../components/admin/ImageManager';
import { api, fileToBase64 } from '../../lib/api';

const emptyForm = {
  title: '',
  slug: '',
  category: '',
  tag: '',
  folder: '',
  description: '',
  isFeatured: false,
  featuredOrder: 0,
  allWorksOrder: 0,
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [coverUploading, setCoverUploading] = useState(false);

  const loadProject = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await api.getProject(id);
      setProject(data.project);
      setForm({
        title: data.project.title,
        slug: data.project.slug,
        category: data.project.category || '',
        tag: data.project.tag || '',
        folder: data.project.folder || '',
        description: data.project.description || '',
        isFeatured: data.project.isFeatured,
        featuredOrder: data.project.featuredOrder,
        allWorksOrder: data.project.allWorksOrder,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [coverData, setCoverData] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverUploading(true);
    setError('');
    try {
      const imageData = await fileToBase64(file);

      if (isEdit) {
        await api.uploadImage(id, imageData, true);
        await loadProject();
      } else {
        const uploaded = await api.uploadToCloud(imageData, 'arjo-studios/covers');
        setCoverData({ url: uploaded.url, publicId: uploaded.publicId });
        setCoverPreview(uploaded.url);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCoverUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEdit) {
        await api.updateProject(id, {
          title: form.title,
          slug: form.slug,
          category: form.category,
          tag: form.tag,
          folder: form.folder,
          description: form.description,
          isFeatured: form.isFeatured,
          featuredOrder: Number(form.featuredOrder),
          allWorksOrder: Number(form.allWorksOrder),
        });
        navigate('/admin/dashboard');
      } else {
        if (!coverData) {
          setError('Please upload a cover image first.');
          setSaving(false);
          return;
        }

        const created = await api.createProject({
          ...form,
          featuredOrder: Number(form.featuredOrder),
          allWorksOrder: Number(form.allWorksOrder),
          coverImageUrl: coverData.url,
          coverCloudinaryId: coverData.publicId,
          galleryImages: [coverData.url],
          cloudinaryIds: [coverData.publicId],
        });

        navigate(`/admin/projects/${created.project.id}/edit`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-stone-500 text-sm">Loading project...</p>;
  }

  const coverUrl = project?.coverImageUrl || coverPreview;

  return (
    <div>
      <div className="mb-8">
        <Link to="/admin/dashboard" className="text-xs text-stone-500 hover:text-stone-300 uppercase tracking-widest font-bold">
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight mt-4">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <Field label="Title" value={form.title} onChange={(v) => updateField('title', v)} required />
            <Field label="Slug (URL id)" value={form.slug} onChange={(v) => updateField('slug', v)} placeholder="auto-generated if empty" />
            <Field label="Category (Selected Works)" value={form.category} onChange={(v) => updateField('category', v)} placeholder="Visual Identity / Packaging Design" />
            <Field label="Tag (Selected Works)" value={form.tag} onChange={(v) => updateField('tag', v)} placeholder="tea brand" />
            <Field label="Folder Label (All Works)" value={form.folder} onChange={(v) => updateField('folder', v)} placeholder="JANI" />
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">Description (All Works)</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-stone-900/50 border border-stone-700 rounded-sm text-stone-100 focus:outline-none focus:border-[#ff4500] transition-colors resize-none"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={form.isFeatured}
                onChange={(e) => updateField('isFeatured', e.target.checked)}
                className="w-4 h-4 accent-[#ff4500]"
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-stone-300">
                Show in Selected Works
              </label>
            </div>

            <Field label="Featured Order" type="number" value={form.featuredOrder} onChange={(v) => updateField('featuredOrder', v)} />
            <Field label="All Works Order" type="number" value={form.allWorksOrder} onChange={(v) => updateField('allWorksOrder', v)} />

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">Cover Image</label>
              {coverUrl && (
                <img src={coverUrl} alt="Cover" className="w-full max-w-xs aspect-square object-cover rounded-sm border border-stone-700 mb-3" />
              )}
              {!isEdit && (
                <label className="inline-block px-4 py-2 bg-stone-800 text-stone-200 font-bold uppercase text-[10px] tracking-widest rounded-sm hover:bg-stone-700 transition-colors cursor-pointer">
                  {coverUploading ? 'Uploading...' : 'Upload Cover'}
                  <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={coverUploading} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-stone-800">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#ff4500] text-white font-black uppercase text-xs tracking-widest rounded-sm hover:bg-[#e03e00] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
          <Link
            to="/admin/dashboard"
            className="px-6 py-3 border border-stone-700 text-stone-400 font-black uppercase text-xs tracking-widest rounded-sm hover:border-stone-500 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {isEdit && project && (
        <div className="mt-12 pt-8 border-t border-stone-800">
          <ImageManager
            projectId={id}
            images={project.images || []}
            coverImageUrl={project.coverImageUrl}
            onUpdate={loadProject}
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-stone-500 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-stone-900/50 border border-stone-700 rounded-sm text-stone-100 focus:outline-none focus:border-[#ff4500] transition-colors"
      />
    </div>
  );
}
