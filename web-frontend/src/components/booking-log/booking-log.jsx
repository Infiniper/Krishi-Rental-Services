import React from "react";
import styles from "./booking-log.module.css";

const BookingLog = ({ image, type, model, registration, available, price, date }) => {
    return (
        <div className={styles.container}>
            <img src={image} alt="Machinery Image" />
                <ul>
            <div className={styles.box}>
                    <div className={styles.boxElements}>
                        <li>
                            <p>Type: {type}</p>
                        </li>
                        <li>
                            <p>Model: {model}</p>
                        </li>
                        </div><div className={styles.boxElements}>
                        <li>
                            <p>Reg. No.: {registration}</p>
                        </li>
                        <li>
                            <p>Status: {available}</p>
                        </li>
                    </div>
                    <div className={styles.boxElements}>
                        <li>
                            <p>Paid: {price}</p>
                        </li>
                        <li>
                            <p>Date: {date}</p>
                        </li>
                    </div>
            </div>
                </ul>
        </div>
    );
}


export default BookingLog;