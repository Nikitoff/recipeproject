'use client';

import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';
import type { Category, Recipe } from '@/shared/types/recipe';

type Props = {
  recipes: Recipe[];
  totalPages: number;
  categories: Category[];
  searchTerm: string;
  categoryId: string;
  currentPage: number;
};

export default function StoreHydrator({ recipes, totalPages, categories, searchTerm, categoryId, currentPage }: Props) {
  const { recipeStore } = useStore();
  useEffect(() => {
    recipeStore.reset();
    recipeStore.hydrate({ recipes, totalPages, categories, searchTerm, categoryId, currentPage });
  }, [recipeStore, recipes, totalPages, categories, searchTerm, categoryId, currentPage]);
  return null;
}


