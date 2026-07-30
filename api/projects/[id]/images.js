import { requireAdmin } from '../../_lib/auth.js';
import { uploadImage } from '../../_lib/cloudinary.js';
import { getSupabase } from '../../_lib/supabase.js';
import { handleOptions, readBody, sendJson, setCors } from '../../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  const { id: projectId } = req.query;
  if (!projectId) return sendJson(res, 400, { error: 'Missing project id' });

  try {
    const db = getSupabase();

    if (req.method === 'GET') {
      const { data, error } = await db
        .from('project_images')
        .select('*')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return sendJson(res, 200, { images: data });
    }

    const admin = await requireAdmin(req, res);
    if (!admin) return;

    if (req.method === 'POST') {
      const body = await readBody(req);
      if (!body.imageData) {
        return sendJson(res, 400, { error: 'Missing imageData (base64)' });
      }

      const { url, publicId } = await uploadImage(body.imageData, `arjo-studios/${projectId}`);

      const { count } = await db
        .from('project_images')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId);

      const { data, error } = await db
        .from('project_images')
        .insert({
          project_id: projectId,
          url,
          cloudinary_public_id: publicId,
          sort_order: (count || 0) + 1,
        })
        .select()
        .single();

      if (error) throw error;

      if (body.setAsCover) {
        await db
          .from('projects')
          .update({ cover_image_url: url, cover_cloudinary_id: publicId })
          .eq('id', projectId);
      }

      return sendJson(res, 201, { image: data });
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('Images API error:', err);
    sendJson(res, 500, { error: err.message || 'Server error' });
  }
}
