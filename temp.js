
const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
            phonenumber,
            password,
        });

        localStorage.setItem("token", response.data.token);

        // Fetch user profile after login
        const userProfile = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${response.data.token}` },
        });

        localStorage.setItem("user", JSON.stringify(userProfile.data));

        // Redirect based on role
        if (userProfile.data.roleid === 1) {
            navigate("/user-profile");
        } else {
            navigate("/provider-profile");
        }
    } catch (error) {
        alert("Invalid phone number or password.");
    }
};
