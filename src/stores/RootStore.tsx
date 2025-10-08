// src/stores/RootStore.tsx
import { createContext, useContext } from "react";
import { RecipeStore } from "@/stores/RecipeStore";
import { FavoritesStore } from "@/stores/FavoritesStore";
import { RecipePageStore } from "@/stores/RecipePageStore";
import { ThemeStore } from "@/stores/ThemeStore";

export class RootStore {
    recipeStore = new RecipeStore();
    favoritesStore = new FavoritesStore();
    recipePageStore = new RecipePageStore();
    themeStore = new ThemeStore();
}

export const RootStoreContext = createContext<RootStore>(null!);

export const useStore = () => {
    const context = useContext(RootStoreContext);
    if (!context) throw new Error("useStore must be used within RootStoreProvider");
    return context;
};

