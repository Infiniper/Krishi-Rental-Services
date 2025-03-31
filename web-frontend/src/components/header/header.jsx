import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Button1 from "../button1/button1";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//   const toggleLogin = () => {
//     setIsLoggedIn(!isLoggedIn);
//   };


const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
};

 return (
        <header className={styles.header}>
            <div className={styles.headerContent} style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
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
                                    <li>
                                        <a href={user?.roleid === 1 ? "/user-profile" : "/provider-profile"}>
                                            Profile
                                        </a>
                                    </li>
                                    {/* <li> <a href="/orders">Orders</a></li> */}
                                    <li><button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Button1 label="Login/Signup" onClick={() => navigate("/login")} />
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
