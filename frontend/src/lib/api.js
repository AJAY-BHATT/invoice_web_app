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
const DIRECT_ROUTES = ['/auth/login', '/auth/register'];

export async function api(path, { method = 'GET', body, token } = {}) {
  const url = DIRECT_ROUTES.includes(path) ? path : `${BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  // Handle empty responses safely
  const contentType = res.headers.get('content-type');
  let data = null;

  if (contentType && contentType.includes('application/json')) {
    const text = await res.text();
    data = text ? JSON.parse(text) : null; // parse only if text is not empty
  }

  if (!res.ok) {
    throw new Error(data?.error || res.statusText || 'Request failed');
  }

  // If PDF, return raw response
  if (contentType && contentType.includes('application/pdf')) {
    return res;
  }

  return data;
}
