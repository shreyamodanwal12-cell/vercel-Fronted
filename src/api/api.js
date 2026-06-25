const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(import.meta.env);
console.log(import.meta.env.VITE_API_BASE_URL);

export default async function apiFetch(endpoint, options = {}) {
  const res = await fetch(BASE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}