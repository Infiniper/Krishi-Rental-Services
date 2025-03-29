import React from "react";
import styles from "./block1.module.css"; // Assuming you will create a CSS module for styling

const Block1 = () => {
    return (
        <div className={styles.container}>
            <img 
                src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742397942/se/cf67azuwup58jy9gdxbh.png" 
                alt="Image 1" 
                className={styles.image} 
            />
            <img 
                src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742318213/se/burosmahh4qk4csn8gts.svg" 
                alt="Image 2" 
                className={styles.image} 
            />
        </div>
    );
};

export default Block1;
