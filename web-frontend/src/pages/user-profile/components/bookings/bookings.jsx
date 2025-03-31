import React from "react";
import BookingLog from "../../../../components/booking-log/booking-log";
import PendingCard from "../../../../components/pending-card/pending-card";
import styles from "./bookings.module.css";


const Bookings = () => {
    return (
        <div className={styles.container}>
            <p >a</p>
            <h2>Your Bookings</h2>
            <h3>Pending Request</h3>
            <PendingCard
            username="Shashwat"
            phone="8529637415"
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            />
            <h3>Active Bookings</h3>
            <BookingLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />
            <BookingLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />
            <h3>Past Bookings</h3>
            <BookingLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />            <BookingLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />            <BookingLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />

        </div>
    );
};

export default Bookings;