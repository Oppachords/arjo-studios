import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function getSupabase() {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  supabase = createClient(url, key);
  return supabase;
}

export async function getProjects({ featured } = {}) {
  const db = getSupabase();
  let query = db
    .from('projects')
    .select('*, project_images(id, url, cloudinary_public_id, sort_order)')
    .order('all_works_order', { ascending: true });

  if (featured) {
    query = query.eq('is_featured', true).order('featured_order', { ascending: true });
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map(formatProject);
}

export async function getProjectById(id) {
  const db = getSupabase();
  const { data, error } = await db
    .from('projects')
    .select('*, project_images(id, url, cloudinary_public_id, sort_order)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return formatProject(data);
}

function formatProject(row) {
  const images = (row.project_images || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.url);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    tag: row.tag,
    folder: row.folder,
    description: row.description,
    coverImageUrl: row.cover_image_url,
    coverCloudinaryId: row.cover_cloudinary_id,
    isFeatured: row.is_featured,
    featuredOrder: row.featured_order,
    allWorksOrder: row.all_works_order,
    galleryImages: images.length > 0 ? images : [row.cover_image_url],
    images: (row.project_images || []).sort((a, b) => a.sort_order - b.sort_order),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export { formatProject };
