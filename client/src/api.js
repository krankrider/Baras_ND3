// API klientas - fetch užklausos backend serveriui
// VITE_API_URL nurodo Render backend URL (pvz. https://xxx.onrender.com)
// Lokalioje aplinkoje proxy veikia per vite.config.js, todėl BASE lieka '/api/...'
const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api/reservations';

async function handle(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  list:   ()        => fetch(BASE).then(handle),
  create: (data)    => fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle),
  update: (id, data) => fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handle),
  remove: (id)      => fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(handle),
};
