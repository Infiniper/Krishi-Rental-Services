import React from "react";
import Profile from "./components/profile/profile";
import Machines from "./components/machines/machines";
import styles from "./provider-profile.module.css"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer";

const ProviderProfile = () => {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.profile}>
                    <Profile
                        username="David"
                        image="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
                        email="david@example.com"
                        phone="1234567890"
                        address="123 Main St, City, State, 12345"
                    />
                </div>
                <div className={styles.machines}>
                    <Machines />
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default ProviderProfile;