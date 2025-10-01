// src/stores/RecipePageStore.tsx
import { makeAutoObservable } from "mobx";
import type { Recipe } from "@/shared/types/recipe";
import { getRecipeById } from "@/services/api";

export class RecipePageStore {
    recipe: Recipe | null = null;
    loading = false;
    error: string | null = null;
    private lastRequestedId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    load = async (documentId: string) => {
        if (!documentId) return;
        this.lastRequestedId = documentId;
        this.loading = true;
        this.error = null;
        this.recipe = null;
        try {
            const data = await getRecipeById(documentId);
            if (this.lastRequestedId === documentId) {
                this.recipe = data;
            }
        } catch (e: unknown) {
            if (this.lastRequestedId === documentId) {
                if (e && typeof e === "object" && "message" in e && typeof (e as { message?: unknown }).message === "string") {
                    this.error = (e as { message?: unknown }).message as string;
                } else {
                    this.error = 'Ошибка';
                }
                this.recipe = null;
            }
        } finally {
            if (this.lastRequestedId === documentId) {
                this.loading = false;
            }
        }
    };
}

export default RecipePageStore;
