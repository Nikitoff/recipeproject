'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import { useRouter } from "next/navigation";

const NavigationMenu = () => {
  const navItems = [
    { label: "Recipes", isActive: true },
    { label: "Meals Categories", isActive: false },
    { label: "Products", isActive: false },
    { label: "Menu Items", isActive: false },
    { label: "Meal Planning", isActive: false },
  ];
  const navigate = useRouter();

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
              <Link href="/" className={`${styles.navLink} ${item.isActive ? styles.active : ""}`}>
                {item.label}
              </Link>
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
            src="/userIcon.svg"
            alt="user"
            width={24}
            height={24}
            className={styles.userIcon}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
