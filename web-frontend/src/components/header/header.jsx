import React, { useState } from "react";
import styles from "./header.module.css";
import Button1 from "../button1/button1";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContent} style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.logo}>
                    <img 
                        src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742318213/se/burosmahh4qk4csn8gts.svg" 
                        alt="Logo" 
                    />
                </div>
            </div>
            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div className={styles.auth}>
                    {isLoggedIn ? (
                        <div className={styles.profileIcon}>
                            <img 
                                src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg" 
                                alt="Profile" 
                            />
                            <div className={styles.dropdown}>
                                <ul>
                                    <li><a href="/account">Profile</a></li>
                                    <li> <a href="/orders">Orders</a></li>
                                    <li><a href="/logout" onClick={toggleLogin}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Button1 label="Login/Signup" onClick={toggleLogin}/>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;



/*
 color scheme:-
background: #A0E4A5
button: #4dae4f
headings: #87BBA2
dark green: #013622
*/