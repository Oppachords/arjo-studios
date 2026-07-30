import { clearAuthCookie } from '../_lib/auth.js';
import { handleOptions, sendJson, setCors } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  clearAuthCookie(res);
  sendJson(res, 200, { success: true });
}
