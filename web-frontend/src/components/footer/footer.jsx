import React, { useState } from "react";
import styles from "./footer.module.css";
import Button1 from "../button1/button1";
import InputBox from "../input-box/input-box";
const Footer = () => {
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <footer className={styles.footer}>
            <div className={styles.description}>
                <img
                    src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742318213/se/burosmahh4qk4csn8gts.svg"
                    alt="Krishi Rental Services Logo"
                    className={styles.logo}
                />
                <p><strong>kisaan ka digital saathi</strong></p>
                <p>Krishi Rental Services is a platform that connects farmers with rental vehicles for agricultural needs.</p>
            </div>
            <nav className={styles.navigation}>
                <h4>Quick Navigation Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                    <li><a href="/faqs">FAQs</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/blog">Blog/Articles</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </nav>
            <div className={styles.contactInfo}>
                <h4>Contact Information</h4>
                <ul>
                    <li><p>📍 123 Krishi Lane, Agri City</p></li>
                    <li><p>📞 (123) 456-7890</p></li>
                    <li><p>📧 support@krishirental.com</p></li>
                    <li><p>🕒 Available 24/7</p></li>
                </ul>

            </div>
            <div className={styles.socialMedia}>
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                </ul>
            </div>

            <div className={styles.legalPolicies}>
                <h4>Legal & Policies</h4>
                <ul>
                    <li><p>📜 <a href="/terms">Terms & Conditions</a></p></li>
                    <li><p>🔏 <a href="/privacy">Privacy Policy</a></p></li>
                    <li><p>🔒 <a href="/refund">Refund & Cancellation Policy</a></p></li>
                </ul>
            </div>

            <div className={styles.newsletter}>
                <h4>Newsletter Subscription</h4>
                <InputBox placeholder="Enter your email" onChange={handleEmailChange} />
                <Button1 label="Subscribe" />
                <p>Stay updated with our latest offers & news!</p>
            </div>

            <div className={styles.appLinks}>
                <h4>Download Our App</h4>
                <ul>
                    <li><a href="https://play.google.com" target="_blank" rel="noopener noreferrer">Google Play Store</a></li>
                    <li><a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">Apple App Store</a></li>
                </ul>
            </div>

            <div className={styles.copyright}>
                <p>Copyright Notice: © 2025 Krishi Rental Services. All rights reserved.</p>
                <p>Built with ❤️ by Krishi for You</p>
            </div>
        </footer>
    );
};

export default Footer;
