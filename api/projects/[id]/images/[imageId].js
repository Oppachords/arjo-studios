import { requireAdmin } from '../../../_lib/auth.js';
import { deleteImage, replaceImage } from '../../../_lib/cloudinary.js';
import { getSupabase } from '../../../_lib/supabase.js';
import { handleOptions, readBody, sendJson, setCors } from '../../../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  const { id: projectId, imageId } = req.query;
  if (!projectId || !imageId) {
    return sendJson(res, 400, { error: 'Missing project id or image id' });
  }

  try {
    const admin = await requireAdmin(req, res);
    if (!admin) return;

    const db = getSupabase();

    const { data: existing, error: fetchError } = await db
      .from('project_images')
      .select('*')
      .eq('id', imageId)
      .eq('project_id', projectId)
      .single();

    if (fetchError || !existing) {
      return sendJson(res, 404, { error: 'Image not found' });
    }

    if (req.method === 'PUT') {
      const body = await readBody(req);

      if (body.imageData) {
        const { url, publicId } = await replaceImage(
          existing.cloudinary_public_id,
          body.imageData,
          `arjo-studios/${projectId}`
        );

        const { data, error } = await db
          .from('project_images')
          .update({ url, cloudinary_public_id: publicId })
          .eq('id', imageId)
          .select()
          .single();

        if (error) throw error;

        if (body.setAsCover) {
          await db
            .from('projects')
            .update({ cover_image_url: url, cover_cloudinary_id: publicId })
            .eq('id', projectId);
        }

        return sendJson(res, 200, { image: data });
      }

      if (body.sortOrder !== undefined) {
        const { data, error } = await db
          .from('project_images')
          .update({ sort_order: body.sortOrder })
          .eq('id', imageId)
          .select()
          .single();

        if (error) throw error;
        return sendJson(res, 200, { image: data });
      }

      return sendJson(res, 400, { error: 'Nothing to update' });
    }

    if (req.method === 'DELETE') {
      if (existing.cloudinary_public_id) {
        try {
          await deleteImage(existing.cloudinary_public_id);
        } catch (e) {
          console.warn('Cloudinary delete failed:', e.message);
        }
      }

      const { error } = await db.from('project_images').delete().eq('id', imageId);
      if (error) throw error;

      return sendJson(res, 200, { success: true });
    }

    sendJson(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('Image API error:', err);
    sendJson(res, 500, { error: err.message || 'Server error' });
  }
}
