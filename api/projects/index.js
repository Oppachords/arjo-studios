import { requireAdmin } from '../_lib/auth.js';
import { getSupabase, getProjects } from '../_lib/supabase.js';
import { handleOptions, readBody, sendJson, setCors, slugify } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  try {
    if (req.method === 'GET') {
      const featured = req.query?.featured === 'true';
      const projects = await getProjects({ featured });
      return sendJson(res, 200, { projects });
    }

    const admin = await requireAdmin(req, res);
    if (!admin) return;

    if (req.method === 'POST') {
      const body = await readBody(req);
      const db = getSupabase();

      const slug = body.slug || slugify(body.title);
      const { data, error } = await db
        .from('projects')
        .insert({
          slug,
          title: body.title,
          category: body.category || '',
          tag: body.tag || '',
          folder: body.folder || body.title.toUpperCase(),
          description: body.description || '',
          cover_image_url: body.coverImageUrl,
          cover_cloudinary_id: body.coverCloudinaryId || null,
          is_featured: body.isFeatured ?? false,
          featured_order: body.featuredOrder ?? 0,
          all_works_order: body.allWorksOrder ?? 0,
        })
        .select()
        .single();

      if (error) throw error;

      if (body.galleryImages?.length) {
        const imageRows = body.galleryImages.map((url, i) => ({
          project_id: data.id,
          url,
          cloudinary_public_id: body.cloudinaryIds?.[i] || null,
          sort_order: i + 1,
        }));
        await db.from('project_images').insert(imageRows);
      }

      return sendJson(res, 201, { project: data });
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('Projects API error:', err);
    sendJson(res, 500, { error: err.message || 'Server error' });
  }
}
