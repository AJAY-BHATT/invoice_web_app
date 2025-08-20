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
// src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Handle errors
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }

  // Return JSON (or PDF for invoices if needed)
  if (res.headers.get('content-type')?.includes('application/pdf')) return res;
  return res.json();
}
