import React from "react";
import styles from "./about.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const About = () => {
    return (
        <div>
        <Header />
        <p className={styles.margin}>A</p>

        <div className={styles.container}>
            <h1>The Force Behind The Vision</h1>
            <ul className={styles.creators}>
                <li className={styles.each}><img src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg" alt="Vishwajeet" />
                <h2>Vishwajeet Singh</h2>
                <h3>Project Lead - Backend Web Developer</h3>
                <p className="styles.about"></p>
                </li>

                <li className={styles.each}><img src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg" alt="Shashwat" />
                <h2>Shashwat Pandey</h2>
                <h3>Full Stack Web Developer</h3>
                <p className="styles.about"></p>
                </li>

                <li className={styles.each}><img src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg" alt="Krishnakant" />
                <h2>Krishnakant Dinkar</h2>
                <h3>Flutter Cross Platform App Developer</h3>
                <p className="styles.about"></p>
                </li>

                <li className={styles.each}><img src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg" alt="Deepanshu" />
                <h2>Deepanshu</h2>
                <h3>Database Manager And Tester</h3>
                <p className="styles.about"></p>
                </li>
            </ul>
        </div>
        <Footer />
        </div>
    )
}

export default About;