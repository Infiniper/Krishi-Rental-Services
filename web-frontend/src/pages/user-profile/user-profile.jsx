import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Profile from "./components/profile/profile";
import Bookings from "./components/bookings/bookings";
import styles from "./user-profile.module.css";


const UserProfile = () => {
    return (
        <div>
            <Header />
                <p className={styles.margin}>margin</p>
            <div className={styles.blocks}>
                <Profile 
                username="vishwajeet"
                image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
                email="johnwick@gmail.com"
                phone="123-456-7890"
                address="123/g1 98th street, yottenheim"
                />
                <Bookings className = {styles.book}/>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile;
