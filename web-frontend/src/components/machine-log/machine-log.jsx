import React, { useState } from "react";
import styles from "./machine-log.module.css";

const BookingLog = ({ image, type, model, registration, available, price, date }) => {
    available = "inactive";
    return (
        <div 
            className={styles.container}
            style={{ 
                backgroundColor: available == "inactive" ? "#b3b2b2" : "#A0E4A5"
            }} // Styling based on 'available' prop and 'isBooked' state
        >
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
                    </div>
                    <div className={styles.boxElements}>
                        <li>
                            <p>Reg. No.: {registration}</p>
                        </li>
                        <li>
                            <p>Price: {price}/acre</p>
                        </li>
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default BookingLog;