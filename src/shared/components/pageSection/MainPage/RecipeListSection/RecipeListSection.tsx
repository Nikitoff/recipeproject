"use client";
import React, { useState } from "react";
import styles from "./RecipeListSection.module.scss";
import Input from "@components/ui/Input/Input";
import MultiDropdown from "@components/ui/MultiDropdown/MultiDropdown";
import { useRouter} from "next/navigation";
import { useStore } from "@/stores/RootStore";
import { observer } from "mobx-react-lite";
import Card from "@components/ui/Card";
import { getFirstImageUrl } from "@/services/api";
import Loader from "@components/ui/Loader";
import Pagination from "@components/ui/Pagination/Pagination";
import Image from "next/image";
import type { Category, Ingredient } from "@/shared/types/recipe";
const RecipeListSection = () => {
  const router = useRouter();
  
  const { recipeStore, favoritesStore } = useStore();
  const [searchInput, setSearchInput] = useState(recipeStore.searchTerm);



  const formatTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h ? `${h} ч ` : ""}${m} мин`;
  };

  const formatIngredients = (ingredients: Ingredient[] | undefined): string => {
    if (!ingredients || !Array.isArray(ingredients)) return "Нет ингредиентов";
    return ingredients
      .map((ing) => `${ing?.name || "Неизвестно"} ${ing?.amount ?? 0}${ing?.unit || ""}`)
      .join(" + ");
  };

  const changePage = (page: number) => {

    const newParams = new URLSearchParams(window.location.search);
    if (page > 1) {
      newParams.set("page", String(page));
    } else {
      newParams.delete("page");
    }
    const url = `${window.location.pathname}?${newParams.toString()}`;
    window.location.href = url;
  };


  const CATEGORY_OPTIONS = [
    { key: "", value: "Все категории" },
    ...recipeStore.categories.map((cat: Category) => ({
      key: String(cat.id),
      value: cat.title,

    })),

  ];

  if (recipeStore.loading && recipeStore.recipes.length === 0) {
    return <Loader />;
  }




  const handleSearchClick = () => {
   
    const newParams = new URLSearchParams(window.location.search);
    if (searchInput.trim()) {
      newParams.set("search", searchInput.trim());
    } else {
      newParams.delete("search");
    }
    newParams.delete("page"); 
    const url = `${window.location.pathname}?${newParams.toString()}`;
    window.location.href = url;
  };


  return (
    <section className={styles.container}>

      <div className={styles.headerText}>
        Find the perfect food and{" "}
        <span className={styles.underline}>drink ideas</span> for every occasion, from{" "}
        <span className={styles.underline}>weeknight dinners</span> to{" "}
        <span className={styles.underline}>holiday feasts</span>.
      </div>


      <div className={styles.filters}>
        <div className={styles.searchRow}>
          <Input
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Enter dishes"
            className={styles.searchInput}
            afterSlot={
              <button
                type="button"
                onClick={handleSearchClick}
                className={styles.searchButton}
              >
                <Image src="/Search.svg" alt="Search" width={24} height={24} />
              </button>
            }
          />
        </div>
        
        <div className={styles.dropdownRow}>
          
          {recipeStore.categories.length > 0 ? (
            <MultiDropdown
              options={CATEGORY_OPTIONS}
              value={
                recipeStore.categoryId
                  ? [{ key: recipeStore.categoryId, value: "" }]
                  : [{ key: "", value: "Все категории" }]
              }
              onChange={(options) => {
                const selectedKey = options[0]?.key || "";
                
                const newParams = new URLSearchParams(window.location.search);
                if (selectedKey && selectedKey !== "0") {
                  newParams.set("category", selectedKey);
                } else {
                  newParams.delete("category");
                }
                newParams.delete("page"); 
                const url = `${window.location.pathname}?${newParams.toString()}`;
                window.location.href = url;
              }}
              getTitle={() => {
                const selected = CATEGORY_OPTIONS.find(
                  (opt) => opt.key === recipeStore.categoryId
                );
                return selected?.value || "Все категории";
              }}
              placeholder="Выберите категорию"
              className={styles.categoryDropdown}
            />
          ) : (
            <Loader></Loader>
          )}
        </div>
      </div>


      <div className={styles.cardsGrid}>
        {recipeStore.recipes.map((recipe) => {
          const imageUrl = getFirstImageUrl(recipe) || "https://via.placeholder.com/360x180?text=No+Image";

          return (
            <Card
              key={recipe.documentId}
              image={imageUrl}
              captionSlot={formatTime(recipe.totalTime)}
              title={recipe.name}
              subtitle={formatIngredients(recipe.ingradients)}
              contentSlot={<span>{recipe.calories} kcal</span>}
              actionSlot={
                <button
                  className={styles.saveBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    favoritesStore.toggle(recipe.documentId);
                  }}
                >
                  <span style={{ color: "white", fontSize: "1.125rem" }}>
                    {favoritesStore.isFavorite(recipe.documentId) ? "Saved" : "Save"}
                  </span>
                </button>
              }
              onClick={() => router.push(`/recipe/${recipe.documentId}`)}
              className="w-full"
            />
          );
        })}
      </div>


      <Pagination
        current={recipeStore.currentPage}
        total={recipeStore.totalPages}
        onChange={changePage}
        prevIcon={<span aria-hidden="true">‹</span>}
        nextIcon={<span aria-hidden="true">›</span>}
        className={styles.pagination}
        pageClassName={styles.pageNumber}
        dotsClassName={styles.dots}
      />
    </section>
  );
};

export default observer(RecipeListSection);
