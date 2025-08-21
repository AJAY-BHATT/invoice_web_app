// const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// export async function api(path, { method='GET', body, token } = {}) {
//   const res = await fetch(`${BASE}${path}`, {
//     method,
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     },
//     body: body ? JSON.stringify(body) : undefined
//   })
//   if (!res.ok) {
//     const err = await res.json().catch(()=>({error:res.statusText}))
//     throw new Error(err.error || 'Request failed')
//   }
//   if (res.headers.get('content-type')?.includes('application/pdf')) {
//     return res
//   }
//   return res.json()
// }

// api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Special routes that should always use relative path
const DIRECT_ROUTES = ['/auth/login', '/auth/register'];

export async function api(path, { method = 'GET', body, token } = {}) {
  // If path is login/register → call directly (relative URL)
  const url = DIRECT_ROUTES.includes(path) ? path : `${BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  if (res.headers.get('content-type')?.includes('application/pdf')) {
    return res;
  }

  return res.json();
}

