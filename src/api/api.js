const BASE_URL = import.meta.env.VITE_API_BASE_URL;
<<<<<<< HEAD
console.log(import.meta.env);
console.log(import.meta.env.VITE_API_BASE_URL);

=======
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
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