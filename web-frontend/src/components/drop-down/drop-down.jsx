import React, { useState } from 'react';
import styles from './drop-down.module.css';
import Button1 from '../button1/button1';

const DropDown = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected: ${option.label}`);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <div onClick={toggleDropdown} style={{ display: 'inline-block' }}>
                <Button1 label={label} />
            </div>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <li key={index} className={styles.dropdownItem}>
                            <a href={option.link} onClick={() => handleOptionClick(option)}>
                                {option.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropDown;
