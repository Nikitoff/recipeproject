import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Рецепт - Food Project",
  description: "Подробный рецепт с ингредиентами и пошаговыми инструкциями",
  openGraph: {
    title: "Рецепт - Food Project",
    description: "Подробный рецепт с ингредиентами и пошаговыми инструкциями",
    type: "article",
    locale: "ru_RU",
  },
};

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
