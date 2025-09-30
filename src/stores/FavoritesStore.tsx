import { makeAutoObservable } from "mobx";

export class FavoritesStore {
    favorites: string[] = []; // массив documentId

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    add(id: string) {
        if (!this.favorites.includes(id)) {
            this.favorites.push(id);
            this.saveToLocalStorage();
        }
    }

    remove(id: string) {
        this.favorites = this.favorites.filter((item) => item !== id);
        this.saveToLocalStorage();
    }

    toggle(id: string) {
        if (this.isFavorite(id)) {
            this.remove(id);
        } else {
            this.add(id);
        }
    }

    isFavorite(id: string) {
        return this.favorites.includes(id);
    }

    saveToLocalStorage() {
        if (typeof window === "undefined") return;
        try {
            window.localStorage.setItem("favorites", JSON.stringify(this.favorites));
        } catch {}
    }

    loadFromLocalStorage() {
        if (typeof window === "undefined") return;
        try {
            const saved = window.localStorage.getItem("favorites");
            if (saved) {
                this.favorites = JSON.parse(saved);
            }
        } catch {}
    }
}