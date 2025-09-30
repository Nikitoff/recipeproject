import React from 'react';
import Image from 'next/image';
import styles from './Loader.module.scss';




export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className = '' }) => {
    return (
        <div className={`${styles.loader} ${styles[`loader_size_${size}`]} ${className}`}>
            {size === 's' && <Image src="/loaderS.svg" alt="loader" width={24} height={24} className={styles.animatedSvg} />}
            {size === 'm' && <Image src="/loaderM.svg" alt="loader" width={40} height={40} className={styles.animatedSvg} />}
            {size === 'l' && <Image src="/loaderL.svg" alt="loader" width={56} height={56} className={styles.animatedSvg} />}
        </div>
    );
};

export default Loader;



