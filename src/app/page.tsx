import React from "react";
import type { Metadata } from "next";
import MainImage from "@components/pageSection/MainPage/MainImage/MainImage";
import RecipeListSection from "@components/pageSection/MainPage/RecipeListSection/RecipeListSection";
import { getRecipes } from "@/services/api";
import StoreHydrator from "./StoreHydrator";
import type { Recipe, Category } from "@/shared/types/recipe";

export const metadata: Metadata = {
  title: "Food Project - Рецепты",
  description: "Найдите  рецепты для любого случая ",
  keywords: ["рецепты", "кулинария", "еда", "готовка", "блюда"],
  openGraph: {
    title: "Food Project - Рецепты",
    description: "Найдите  рецепты для любого случая",
    type: "website",
    locale: "ru_RU",
  },
};

async function getInitialData(search: string, category: string, page: number) {
  
  const data = await getRecipes({ name: search, category, page });
  
  return data;
}

async function getCategories() {
  try {
    const base = process.env.STRAPI_URL || '';
    if (!base) return [];
    
    const res = await fetch(`${base}/api/meal-categories?populate=*`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error('Failed to load categories:', error);
    return [];
  }
}

export default async function MainPage({ searchParams }: { searchParams: Promise<{ search?: string; category?: string; page?: string }> }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "";
  const page = Number(params?.page || 1);
  let recipes: Recipe[] = [];
  let totalPages = 1;
  let categories: Category[] = [];
  
  try {
    const [data, categoriesData] = await Promise.all([
      getInitialData(search, category, page),
      getCategories()
    ]);
    recipes = data?.data || [];
    totalPages = data?.meta?.pagination?.pageCount || 1;
    categories = categoriesData;
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
  
  return (
    <>
      <StoreHydrator recipes={recipes} totalPages={totalPages} categories={categories} searchTerm={search} categoryId={category} currentPage={page} />
      <MainImage />
      <RecipeListSection />
    </>
  );
}
