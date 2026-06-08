const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || (() => {
  // Auto-detect based on environment
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:4000';
  }
  // In production (Vercel), use relative path (same domain)
  return '';
})();

export async function apiFetch(path, options = {}) {
  const adminToken = localStorage.getItem('IBID_ADMIN_TOKEN');
  const userToken = localStorage.getItem('IBID_USER_TOKEN');
  const authToken = adminToken || userToken;
  const headers = {
    ...(options.headers || {}),
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };

  const base = apiBaseUrl ? apiBaseUrl.replace(/\/$/, '') : '';
  const url = path.startsWith('http') ? path : `${base}${path}`;
  
  console.log('API Request:', url); // Debug logging
  
  const response = await fetch(url, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || response.statusText || 'Request failed');
  }
  return data;
}
