import React from "react";
import styles from "./profile.module.css"

const Profile = ({username, image, email, phone, address}) => {
    return (
        <div className={styles.container}>
            <p className={styles.margin}>margin</p>
            <h1>Welcome {username}!</h1>
            <div className={styles.box}>
                <div className={styles.dp}>
                    <img src={image} alt="DP" />
                </div>
                <div className={styles.details}>
                    <ul>
                        <li><p>Phone No.: {phone}</p></li>
                        <li><p>Email: {email}</p></li>
                        <li><p>Address: {address}</p></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;
