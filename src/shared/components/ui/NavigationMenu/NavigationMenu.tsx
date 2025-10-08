'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/RootStore";
import { observer } from "mobx-react-lite";





const NavigationMenu = observer(() => {
  const { recipeStore, themeStore } = useStore();
  const navigate = useRouter();

  const navItems = [
    { label: "Recipes", isActive: true, href: "/" },
    { 
      label: "I'm Feeling Lucky", 
      isActive: true, 
      onClick: () => {
        const id = recipeStore.getRandomDocumentId();
        if (id) {
          navigate.push(`/recipe/${id}`);
        } else {
          console.log('Нет доступных рецептов');
        }
      }
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logoWrapper}>
          <Image
            src="/logo-simple-framed-green-gradient 1.svg"
            alt="Logo"
            width={40}
            height={40}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>Food Client</span>
        </div>

        <div className={styles.navMenu}>
          {navItems.map((item) => (
            <div key={item.label} className={styles.navItem}>
              {item.href ? (
                <Link href={item.href} className={`${styles.navLink} ${item.isActive ? styles.active : ""}`}>
                  {item.label}
                </Link>
              ) : (
                <label
                  htmlFor="button"
                  onClick={item.onClick}
                  className={`${styles.navLink} ${item.isActive ? styles.active : ""}`}
                >
                  {item.label}
                </label>    
              )}
            </div>
          ))}
        </div>

        <div className={styles.navActions}>
          <Image
            src="/heart.svg"
            alt="favorites"
            width={24}
            height={24}
            onClick={() => navigate.push("/favorites")}
            className={styles.heartIcon}
          />
          <Image
            src="/sun.svg"
            alt="sun"
            width={24}
            height={24}
            className={styles.userIcon}
            onClick={() => themeStore.toggleTheme()}
          />
        </div>
      </div>
    </nav>
  );
});

export default NavigationMenu;


