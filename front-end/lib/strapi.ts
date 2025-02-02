// lib/strapi.ts
export const fetchAPI = async (endpoint: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  };
  