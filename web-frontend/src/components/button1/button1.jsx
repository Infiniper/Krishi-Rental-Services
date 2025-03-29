import React from "react";
import styles from "./button1.module.css"; // Importing styles as a module

const Button1 = ({ label, onClick }) => {
  return (
      <button className={styles.button1} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button1;
