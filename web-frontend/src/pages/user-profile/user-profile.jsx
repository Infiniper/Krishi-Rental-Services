import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Profile from "./components/profile/profile";
import Bookings from "./components/bookings/bookings";
import styles from "./user-profile.module.css";



const UserProfile = () => {
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
            <p className={styles.margin}>margin</p>
            <div className={styles.blocks}>
                <Profile 
                    username={user.name}
                    image="https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
                    email={user.email}
                    phone={user.phonenumber}
                    address={user.address}
                />
                <Bookings className={styles.book} />
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
