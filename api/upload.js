import { requireAdmin } from '../_lib/auth.js';
import { uploadImage } from '../_lib/cloudinary.js';
import { handleOptions, readBody, sendJson, setCors } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const body = await readBody(req);
    if (!body.imageData) {
      return sendJson(res, 400, { error: 'Missing imageData (base64)' });
    }

    const folder = body.folder || 'arjo-studios/uploads';
    const { url, publicId } = await uploadImage(body.imageData, folder);

    sendJson(res, 200, { url, publicId });
  } catch (err) {
    console.error('Upload error:', err);
    sendJson(res, 500, { error: err.message || 'Upload failed' });
  }
}
