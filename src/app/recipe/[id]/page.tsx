'use client';
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@components/pageSection/RecipePage/RecipePage.module.scss";
import Loader from "@components/ui/Loader";
import IngredientsEquip from "@components/pageSection/RecipePage/IngredientsEquip/IngredientsEquip";
import Title from "@components/pageSection/RecipePage/Title/Title";
import RecipeHeader from "@components/pageSection/RecipePage/ImageHeader/RecipeHeader";
import Directions from "@components/pageSection/RecipePage/Directions/Directions";
import { useStore } from "@/stores/RootStore";
import { observer } from "mobx-react-lite";

const RecipePage = () => {
    const params = useParams<{ id: string }>();
    const documentId = params?.id as string | undefined;
    const router = useRouter();
    const { recipePageStore } = useStore();

    useEffect(() => {
        if (!documentId) return;
        recipePageStore.load(documentId).catch(() => {
            router.push("/");
        });
    }, [documentId, router, recipePageStore]);

    if (recipePageStore.loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <Loader size="l" />
            </div>
        );
    }

    if (!recipePageStore.recipe) {
        return <div className={styles.container}>Рецепт не найден</div>;
    }

    const recipe = recipePageStore.recipe;
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <Title title={recipe.name} />
                <RecipeHeader
                    imageUrl={recipe.images[0]?.url || "https://via.placeholder.com/448x298"}
                    totalTime={recipe.totalTime}
                    CookingTime={recipe.cookingTime}
                    PrepTime={recipe.preparationTime}
                    servings={recipe.servings}
                    likes={recipe.likes}
                    rating={recipe.rating}
                />

                <section className={styles.summaryText}>
                    <div
                        dangerouslySetInnerHTML={{ __html: recipe.summary }}
                    />
                </section>
                <section className={styles.section}>
                    <IngredientsEquip
                        ingredients={recipe.ingradients || []}
                        equipment={recipe.equipments || []}
                    />
                </section>

                <section className={styles.section}>
                    <Directions steps={recipe.directions} />
                </section>
            </div>
        </div>
    );
};

export default observer(RecipePage);
