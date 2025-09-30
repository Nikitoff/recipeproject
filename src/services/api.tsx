import qs from 'qs';
import { Recipe, PaginatedResponse, RecipeFilters } from '@/shared/types/recipe';

function getStrapiBaseUrl() {
  return typeof window === 'undefined'
    ? (process.env.STRAPI_URL || '')
    : (process.env.NEXT_PUBLIC_STRAPI_URL || '');
}

function getStrapiToken() {
  return typeof window === 'undefined' ? process.env.STRAPI_API_TOKEN : undefined; // не светим в браузере
}

async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const token = getStrapiToken();
  const res = await fetch(input, {
    cache: 'no-store',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error((await res.text().catch(() => '')) || `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const getRecipes = async (
  filters: RecipeFilters = {}
): Promise<PaginatedResponse> => {
  const { name, category, page = 1, pageSize = 9 } = filters;

  const queryParams: Record<string, any> = {
    populate: ['images', 'ingradients', 'category'],
    pagination: { page, pageSize },
    filters: {},
  };

  if (name) queryParams.filters.name = { $containsi: name };
  if (category && category !== "0" && category !== "") {
    queryParams.filters.category = { id: { $eq: Number(category) } };
  }

  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
  const base = getStrapiBaseUrl();
  const url = `${base}/api/recipes?${queryString}`;
  console.log('API request URL:', url);
  console.log('Query params:', queryParams);
  return apiFetch<PaginatedResponse>(url);
};

export const getRecipeById = async (documentId: string): Promise<Recipe> => {
  const queryParams = {
    populate: ['images', 'ingradients', 'category', 'directions', 'equipments'],
  };
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });
  const base = getStrapiBaseUrl();
  const url = `${base}/api/recipes/${documentId}?${queryString}`;
  const data = await apiFetch<{ data: Recipe }>(url);
  if (!data?.data) throw new Error('Рецепт не найден');
  return data.data;
};

export function getFirstImageUrl(recipe: Recipe): string | null {
  const url = recipe.images?.[0]?.url || null;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const base = getStrapiBaseUrl();
  return `${base}${url}`;
}

export default {
  getRecipes,
  getRecipeById,
  getFirstImageUrl,
};