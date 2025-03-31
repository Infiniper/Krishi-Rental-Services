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

// function App() {
//   return(
//     <div>
//       {/* <Home /> */}
//       <Search />
//       {/* <About /> */}
//       {/* <Booking 
//       image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742736399/se/avweov9karwcojja3taq.jpg"
//       type = "Tractor"
//       model = "Mahindra Arjun Novo"
//       status =  "Available"
//       owner =  "Vishwajeet Singh"
//       price =  "2999"
//       registration="UP 707 420"
//       discription = "A tractor is an engineering vehicle specifically designed to deliver a high tractive effort (or torque) at slow speeds, for the purposes of hauling a trailer or machinery such as that used in agriculture, mining or construction."
//       /> */}
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking/:id" element={<Booking />} /> 
        <Route path="/user-profile" element={<UserProfile />} /> 
        <Route path="/provider-profile" element={<ProviderProfile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
