import React, { useEffect, useState } from "react";
import Profile from "./components/profile/profile";
import Machines from "./components/machines/machines";
import styles from "./provider-profile.module.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

const ProviderProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login"); // Redirect if not logged in
        }
    }, [navigate]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.profile}>
                    <Profile
                        username={user.name}
                        image="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
                        email={user.email}
                        phone={user.phonenumber}
                        address={user.address}
                    />
                </div>
                <div className={styles.machines}>
                    <Machines />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProviderProfile;
