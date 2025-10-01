import type  { Metadata } from "next";

export const metadata: Metadata = {
  title: "Избранные рецепты",
  description: "Ваши сохраненные рецепты в одном месте",
  openGraph: {
    title: "Избранные рецепты - Food Project",
    description: "Ваши сохраненные рецепты в одном месте",
    type: "website",
    locale: "ru_RU",
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
