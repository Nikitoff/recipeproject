'use client';
import React from 'react';
import { reaction } from 'mobx';
import Button from '@components/ui/Button/Button';
import Card from '@components/ui/Card';
import styles from '@components/pageSection/FavoritesPage/FavoritesPage.module.scss';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { getFirstImageUrl } from '../../services/api';
import { useRouter } from 'next/navigation';

// Метаданные удалены - теперь в layout.tsx

const FavoritesPage = () => {
    const { favoritesStore, recipeStore } = useStore();
    const router = useRouter();
    
    // Загружаем все рецепты для избранного
    React.useEffect(() => {
        const loadAllRecipes = async () => {
            try {
                const { getRecipes } = await import('../../services/api');
                const data = await getRecipes({ pageSize: 1000 }); // загружаем много рецептов
                recipeStore.hydrate({ 
                    recipes: data.data || [], 
                    totalPages: data.meta?.pagination?.pageCount || 1,
                    categories: [],
                    searchTerm: '',
                    categoryId: '',
                    currentPage: 1
                });
            } catch (e) {
                console.error('Failed to load recipes for favorites:', e);
            }
        };
        
        // Загружаем рецепты при каждом посещении страницы избранного
        loadAllRecipes();
        
        // Отслеживаем изменения в избранном и перезагружаем рецепты
        const dispose = reaction(
            () => favoritesStore.favorites.length,
            () => {
                if (recipeStore.recipes.length > 0) {
                    loadAllRecipes();
                }
            }
        );
        
        return () => dispose();
    }, [recipeStore, favoritesStore]);
    
    const favoriteRecipes = recipeStore.recipes.filter((recipe) =>
        favoritesStore.isFavorite(recipe.documentId)
    );

    const formatIngredients = (ingredients: any[] | undefined): string => {
        if (!ingredients || !Array.isArray(ingredients)) return 'Нет ингредиентов';
        return ingredients
            .map((ing) => `${ing?.name || 'Неизвестно'} ${ing?.amount ?? 0}${ing?.unit || ''}`)
            .join(' + ');
    };

    if (favoritesStore.favorites.length === 0) {
        return (
            <div className={styles.empty}>
                <h2>Ваши избранные рецепты</h2>
                <p>Вы ещё не сохранили ни одного рецепта.</p>
                <Button className={styles.backBtn} onClick={() => router.push('/')}>На главную</Button>
            </div>
        );
    }

    if (recipeStore.loading) {
        return (
            <div className={styles.loading}>
                <p>Загрузка рецептов...</p>
                <Button className={styles.backBtn} onClick={() => router.push('/')}>На главную</Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Избранное </h1>
            <div style={{ marginBottom: 16 }}>
                <Button className={styles.backBtn} onClick={() => router.push('/')}>На главную</Button>
            </div>
            <div className={styles.cardsGrid}>
                {favoriteRecipes.map((recipe) => {
                    const imageUrl = getFirstImageUrl(recipe) || 'https://via.placeholder.com/360x180?text=No+Image';

                    return (
                        <Card
                            key={recipe.documentId}
                            image={imageUrl}
                            captionSlot={`${recipe.totalTime} мин`}
                            title={recipe.name}
                            subtitle={formatIngredients(recipe.ingradients)}
                            contentSlot={<span>{recipe.calories} kcal</span>}
                            actionSlot={
                                <Button
                                    className={styles.deleteBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        favoritesStore.toggle(recipe.documentId);
                                    }}
                                >
                                    <span style={{ color: 'white', fontSize: '1.125rem' }}>
                                        Delete
                                    </span>
                                </Button>
                            }
                            onClick={() => router.push(`/recipe/${recipe.documentId}`)}
                            className="w-full"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default observer(FavoritesPage);