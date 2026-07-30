const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  logout: () => request('/auth/logout', { method: 'POST' }),

  me: () => request('/auth/me'),

  getProjects: (featured) =>
    request(`/projects${featured ? '?featured=true' : ''}`),

  getProject: (id) => request(`/projects/${id}`),

  createProject: (data) =>
    request('/projects', { method: 'POST', body: JSON.stringify(data) }),

  updateProject: (id, data) =>
    request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteProject: (id) =>
    request(`/projects/${id}`, { method: 'DELETE' }),

  uploadImage: (projectId, imageData, setAsCover = false) =>
    request(`/projects/${projectId}/images`, {
      method: 'POST',
      body: JSON.stringify({ imageData, setAsCover }),
    }),

  replaceImage: (projectId, imageId, imageData, setAsCover = false) =>
    request(`/projects/${projectId}/images/${imageId}`, {
      method: 'PUT',
      body: JSON.stringify({ imageData, setAsCover }),
    }),

  deleteImage: (projectId, imageId) =>
    request(`/projects/${projectId}/images/${imageId}`, { method: 'DELETE' }),

  reorderImage: (projectId, imageId, sortOrder) =>
    request(`/projects/${projectId}/images/${imageId}`, {
      method: 'PUT',
      body: JSON.stringify({ sortOrder }),
    }),

  uploadToCloud: (imageData, folder) =>
    request('/upload', { method: 'POST', body: JSON.stringify({ imageData, folder }) }),
};

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
