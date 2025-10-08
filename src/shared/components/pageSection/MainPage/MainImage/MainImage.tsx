import Image from "next/image";
import styles from "./MainImage.module.scss";

const MainImage = () => {
    return (
        <div className={styles.MainImage}>
            <div className={styles.background}></div>
            <div className={styles.content}>
                <div className={styles.imageTextWrapper}>
                    <Image src="/MainImageText.svg" alt="Food Project" width={312} height={184} className={styles.imageText} />
                </div>
            </div>
        </div>
    );
};

export default MainImage;
