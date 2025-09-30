import React from "react";
import Image from "next/image";
import styles from "./IngredientsEquip.module.scss";

interface Ingredient {
    id: number | string;
    name: string;
    amount: number;
    unit: string;
}

interface Equipment {
    id: number | string;
    name: string;
}

interface IngredientsEquipProps {
    ingredients: Ingredient[];
    equipment: Equipment[];
}

const IngredientsEquip: React.FC<IngredientsEquipProps> = ({ ingredients, equipment }) => {
    return (
        <div className={styles.container}>



            <div className={styles.grid}>

                <div className={styles.columnWrapper}>
                    <h2 className={styles.title}>Ingredients</h2>
                    <div className={styles.twoColumnGrid}>
                        {ingredients.map((ing) => (
                            <div key={ing.id} className={styles.item}>
                                <Image src="/IngredientsIcon.svg" alt="Ingredient" width={20} height={20} />
                                <span className={styles.text}>{ing.amount} {ing.unit} {ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className={styles.equipmentWrapper}>
                    <h2 className={styles.title}>Equipment</h2>
                    <div className={styles.twoColumnGrid}>
                        {equipment.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <Image src="/EquipIcon.svg" alt="Equipment" width={20} height={20} />
                                <span className={styles.text}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className={styles.divider}></div>
                <div className={styles.marker}></div>
            </div>
        </div>
    );
};

export default IngredientsEquip;