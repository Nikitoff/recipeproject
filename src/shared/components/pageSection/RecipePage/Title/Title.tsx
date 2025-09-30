"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Title.module.scss";

interface RecipeTitleProps {
    title: string;
}

const Title: React.FC<RecipeTitleProps> = ({ title }) => {
    const router = useRouter();

    return (
        <div className={styles.titleContainer}>

            <button
                onClick={() => router.push("/")}
                className={styles.backButton}
                aria-label="Назад на главную"
            >
                <Image src="/arrowleft.svg" alt="Back" width={24} height={24} />
            </button>


            <h1 className={styles.titleText}>{title}</h1>
        </div>
    );
};

export default Title;