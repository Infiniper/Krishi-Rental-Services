import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import styles from "./login.module.css";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

const Login = () => {
    const [credentials, setCredentials] = useState({
        phonenumber: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/login", credentials);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            // alert("Login successful!");
            // Redirect based on role
            navigate("/");
            // if (response.data.user.roleid === 1) {
            //     navigate("/user-profile");
            // } else if (response.data.user.roleid === 2) {
            //     navigate("/provider-profile");
            // }            

        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
            <div>
                <Header />
        <div className={styles.box2}>
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.box}>
                <p>Phone No.:</p>
                <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
                <p>Password:</p>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
        <Footer />
        </div>
    );
};

export default Login;
