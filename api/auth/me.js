import { getTokenFromRequest, verifyToken } from '../_lib/auth.js';
import { handleOptions, sendJson, setCors } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const token = getTokenFromRequest(req);
  if (!token) {
    return sendJson(res, 200, { authenticated: false });
  }

  try {
    const payload = await verifyToken(token);
    sendJson(res, 200, { authenticated: true, username: payload.username });
  } catch {
    sendJson(res, 200, { authenticated: false });
  }
}
