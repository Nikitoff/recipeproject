import { makeAutoObservable } from "mobx";
import type { Recipe, Category } from "@/shared/types/recipe";
import { getRecipes } from "@/services/api";

export class RecipeStore {
    recipes: Recipe[] = [];
    categories: Category[] = [];
    loading = false;
    error: string | null = null;
    initialized = false;

    searchTerm = "";
    categoryId = "";
    currentPage = 1;
    pageSize = 9;
    totalPages = 1;

    constructor() {
        makeAutoObservable(this);
    }

    loadRecipes = async () => {
        this.loading = true;
        this.error = null;

        try {
            

            
            const response = await getRecipes({
                name: this.searchTerm,
                category: undefined, 
                page: this.currentPage,
                pageSize: this.pageSize,
            });

            this.recipes = response.data || [];
            this.totalPages = response.meta?.pagination?.pageCount || 1;
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err && typeof (err as { message?: unknown }).message === "string") {
                this.error = (err as { message?: unknown }).message as string;
            } else {
                this.error = 'Ошибка';
            }
            this.recipes = [];
            this.totalPages = 1;
        } finally {
            this.loading = false;
        }
    };
    
    
    loadCategories = async () => {
        
        if (typeof window !== 'undefined') {
            console.log('Categories loading skipped on client side');
            this.categories = [];
            return;
        }
        
        try {
            const base = process.env.STRAPI_URL || '';
            if (!base) {
                console.log('STRAPI_URL not configured');
                this.categories = [];
                return;
            }
            
            const res = await fetch(`${base}/api/meal-categories?populate=*`, { 
                cache: 'no-store',
                headers: {
                    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) {
                console.log('Categories API not accessible:', res.status);
                this.categories = [];
                return;
            }
            
            const data = await res.json();
            this.categories = data?.data || [];
        } catch (err) {
            console.error("Ошибка загрузки категорий:", err);
            this.categories = [];
        }
    };

    getRandomDocumentId(): string | null {
        if (this.recipes.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.recipes.length);
        return this.recipes[randomIndex].documentId;
    }

    setSearchTerm = (value: string) => {
        this.searchTerm = value;
        this.currentPage = 1;
        this.loadRecipes();
    };

    setCategoryId = (value: string) => {
        this.categoryId = value;
        this.currentPage = 1;
        this.loadRecipes();
    };

    setCurrentPage = (page: number) => {
        this.currentPage = page;
        this.loadRecipes();
    };

    // Метод для инициализации данных
    initialize = async () => {
        // На клиенте не загружаем данные - они приходят через гидротацию
        if (typeof window !== 'undefined') {
            this.initialized = true;
            return;
        }
        
        await Promise.all([
            this.loadCategories(),
            this.loadRecipes()
        ]);
        this.initialized = true;
    };

    hydrate = (params: {
        recipes?: Recipe[];
        totalPages?: number;
        categories?: Category[];
        searchTerm?: string;
        categoryId?: string;
        currentPage?: number;
    }) => {
        if (params.recipes) this.recipes = params.recipes;
        if (typeof params.totalPages === 'number') this.totalPages = params.totalPages;
        if (params.categories) this.categories = params.categories;
        if (typeof params.searchTerm === 'string') this.searchTerm = params.searchTerm;
        if (typeof params.categoryId === 'string') this.categoryId = params.categoryId;
        if (typeof params.currentPage === 'number') this.currentPage = params.currentPage;
        this.initialized = true;
    };

    reset = () => {
        this.recipes = [];
        this.categories = [];
        this.loading = false;
        this.error = null;
        this.initialized = false;
        this.searchTerm = "";
        this.categoryId = "";
        this.currentPage = 1;
        this.totalPages = 1;
    };
}

export default RecipeStore;
