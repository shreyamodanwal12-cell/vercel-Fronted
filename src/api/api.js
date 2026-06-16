const BASE_URL = "http://localhost:4000/api";

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