import React from "react";
// **
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// **
import Home from "./pages/home/home";
import "./styles/global.css";
import Search from "./pages/search/search";
import About from "./pages/about/about";
import Booking from "./pages/booking/booking";
import UserProfile from "./pages/user-profile/user-profile";
import ProviderProfile from "./pages/provider-profile/provider-profile";
import PrivateRoute from "./components/private-route/PrivateRoute"; 
import AddMachine from "./components/add-machine/add-machine";
import Login from "./pages/login-signup/login";  // Import login page ??
import Signup from "./pages/login-signup/signup";  // Import login page ??


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/add-machine" element={<AddMachine />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protecting user profile and provider profile routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
