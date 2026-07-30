import { createToken, setAuthCookie, validateCredentials } from '../_lib/auth.js';
import { handleOptions, readBody, sendJson, setCors } from '../_lib/utils.js';

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { username, password } = await readBody(req);

    if (!validateCredentials(username, password)) {
      return sendJson(res, 401, { error: 'Invalid username or password' });
    }

    const token = await createToken(username);
    setAuthCookie(res, token);
    sendJson(res, 200, { success: true, username });
  } catch (err) {
    console.error('Login error:', err);
    sendJson(res, 500, { error: 'Login failed' });
  }
}
