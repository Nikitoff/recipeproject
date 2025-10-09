import { makeAutoObservable } from "mobx";

export type Theme = "light" | "dark";

export class ThemeStore {
    theme: Theme = "light";

    constructor() {
        makeAutoObservable(this);
        this.loadTheme();
    }

    setTheme(theme: Theme) {
        this.theme = theme;
        this.saveTheme();
        this.applyTheme();
    }

    toggleTheme() {
        this.setTheme(this.theme === "light" ? "dark" : "light");
    }

    saveTheme() {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("theme", this.theme);
        }
    }

    loadTheme() {
        if (typeof window !== "undefined") {
            const saved = window.localStorage.getItem("theme");
            if (saved === "light" || saved === "dark") {
                this.theme = saved;
                this.applyTheme();
            }
        }
    }

    applyTheme() {
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", this.theme);
        }
    }
}

