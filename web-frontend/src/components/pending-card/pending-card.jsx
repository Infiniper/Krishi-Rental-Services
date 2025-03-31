import React from "react";
import styles from "./pending-card.module.css";

const PendingCard = ({username, phone, image, model, registration}) => {
    return (
        <div className={styles.container}>
            <div className={styles.image}><img src={image} alt="Machinery Image" /></div>
            <div className={styles.user}>
                <p>Name: {username}</p>
                <p>Phone No.: {phone}</p>
            </div>
            <div className={styles.machine}>
                <p>Model: {model}</p>
                <p>Registration No.: {registration}</p>
            </div>
        </div>
    );
}

export default PendingCard;


// https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg

// username = "Gangadhar"
// phone = "123-456-7890"
// image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg"
// model = "Mahindra Arjun Novo"
// registration = "UP 707 420"