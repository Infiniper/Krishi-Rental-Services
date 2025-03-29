import React from "react";
import styles from "./input-box.module.css";

const InputBox = ({ placeholder, type = "text", onChange }) => {
    return (
        <input 
            type={type} 
            className={styles.inputBox} 
            placeholder={placeholder} 
            onChange={onChange} 
        />
    );
};


export default InputBox;






