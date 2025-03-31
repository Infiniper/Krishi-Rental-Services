import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
