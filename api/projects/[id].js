import { requireAdmin } from '../_lib/auth.js';
import { deleteImage } from '../_lib/cloudinary.js';
import { getSupabase, getProjectById } from '../_lib/supabase.js';
import { handleOptions, readBody, sendJson, setCors } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  const { id } = req.query;
  if (!id) return sendJson(res, 400, { error: 'Missing project id' });

  try {
    if (req.method === 'GET') {
      const project = await getProjectById(id);
      return sendJson(res, 200, { project });
    }

    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const db = getSupabase();

    if (req.method === 'PUT') {
      const body = await readBody(req);
      const updates = {};

      if (body.title !== undefined) updates.title = body.title;
      if (body.slug !== undefined) updates.slug = body.slug;
      if (body.category !== undefined) updates.category = body.category;
      if (body.tag !== undefined) updates.tag = body.tag;
      if (body.folder !== undefined) updates.folder = body.folder;
      if (body.description !== undefined) updates.description = body.description;
      if (body.coverImageUrl !== undefined) updates.cover_image_url = body.coverImageUrl;
      if (body.coverCloudinaryId !== undefined) updates.cover_cloudinary_id = body.coverCloudinaryId;
      if (body.isFeatured !== undefined) updates.is_featured = body.isFeatured;
      if (body.featuredOrder !== undefined) updates.featured_order = body.featuredOrder;
      if (body.allWorksOrder !== undefined) updates.all_works_order = body.allWorksOrder;

      const { data, error } = await db
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return sendJson(res, 200, { project: data });
    }

    if (req.method === 'DELETE') {
      const project = await getProjectById(id);

      const cloudinaryIds = [
        project.coverCloudinaryId,
        ...project.images.map((img) => img.cloudinary_public_id),
      ].filter(Boolean);

      for (const publicId of cloudinaryIds) {
        try {
          await deleteImage(publicId);
        } catch (e) {
          console.warn('Cloudinary delete failed:', publicId, e.message);
        }
      }

      const { error } = await db.from('projects').delete().eq('id', id);
      if (error) throw error;

      return sendJson(res, 200, { success: true });
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('Project API error:', err);
    sendJson(res, 500, { error: err.message || 'Server error' });
  }
}
