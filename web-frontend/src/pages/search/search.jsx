import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchCard from "../../components/search-card/search-card";
// import DummyData from "./components/dummy-data";
import styles from "./search.module.css";
import API from "../../api/axiosInstance";

// const Search = () => {
//     return (
//         <div>
//             <Header />
//             <p className={styles.margin}>A</p>
//             <h2 className={styles.title}>Tractors nearby</h2>
//             <div className={styles.list}>
//                 {DummyData.map((item, index) => (
//                     <SearchCard
//                         key={index}
//                         image={item.image}
//                         title={item.title}
//                         distance={item.distance}
//                         price={item.price}
//                         available={item.available}
//                     />
//                 ))}
//             </div>
//             <Footer />
//         </div>
//     );
// };

const Search = () => {
    const [machinery, setMachinery] = useState([]);

    useEffect(() => {
        const fetchMachinery = async () => {
            try {
                const response = await API.get("/machinery"); // Fetch data from backend
                // const response = await axios.get('http://localhost:5000/api/machinery');
                console.log("printing response.data: ", response.data);
                setMachinery(response.data);
                console.log("Fetched Machinery Data: ", machinery);

            } catch (error) {
                console.error("Error fetching machinery:", error);
            }
        };

        fetchMachinery();
    }, []);

 // Function to generate random distance between 0 to 50 km
 const getRandomDistance = () => {
    return Math.floor(Math.random() * 51); // Generates a random number between 0 and 50 (inclusive)
};

    return (
        <div>
            <Header />
            <p className={styles.margin}>A</p>
            <h2 className={styles.title}>Tractors Nearby</h2>
            <div className={styles.list}>
                {machinery.map((item) => (
                    
                    <SearchCard
                        id={item.machineryid}
                        key={item.machineryid}
                        image={item.images && item.images.length > 0 ? item.images[0] : "default-image-url"} 
                        // ✅ Use first image or default
                        title={item.model}
                        // distance={"10 km"} // Placeholder, add real data later
                        distance={`${getRandomDistance()} km`} //  Display random distance
                        price={`₹${item.price}`} 
                        price={`₹${item.price}`} // Adjust based on your DB structure
                        available={item.status}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Search;