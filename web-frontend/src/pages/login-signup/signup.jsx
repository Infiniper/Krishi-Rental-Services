import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import styles from "./signup.module.css";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        phonenumber: "",
        password: "",
        roleid: "1", // Default role as Farmer
        email: "",
        address: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await API.post("/auth/signup", user);
    
                // Save token and user data to localStorage if your backend returns them
                if (response.data.token && response.data.user) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
    
                // alert("Signup successful! Please login.");
                navigate("/login");
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    // Show a warning if the phone number is already registered
                    alert("Phone number already registered. Please log in.");
                } else {
                    alert("Error signing up. Please try again.");
                    console.error(error);
                }
            }
        };

        return (
            <div>
                <Header />
                <div className={styles.box2}>
                    <div className={styles.leaf}>
                        <img src="https://res.cloudinary.com/ddyxqpatx/image/upload/v1743443397/se/j7xv8uccjtua4ga7brux.png" alt="leaf" />
                    </div>
                    <div className={styles.container}>
                        <h2>Signup</h2>
                        <form onSubmit={handleSubmit} className={styles.box}>
                            <p>Name:</p>
                            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />


                            <p>Phone Number:</p>
                            <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
                            
                            <p>Email:</p>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                            
                            <p>Address:</p>
                            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                            
                            <p>Password:</p>
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                            
                            <p>Role:</p>
                            <select name="roleid" onChange={handleChange} className={styles.role}>
                                <option value="1">Farmer</option>
                                <option value="2">Service Provider</option>
                            </select>
                            
                            <button type="submit">Signup</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
        
    };
    
    export default Signup;
    