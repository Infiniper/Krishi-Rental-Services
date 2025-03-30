import React from "react";
import axios from "axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchCard from "../../components/search-card/search-card";
import DummyData from "./components/dummy-data";
import styles from "./search.module.css";

const Search = () => {

    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/machinery");  // Adjust the URL to match your backend API endpoint
    //             setData(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setError("Failed to fetch data");
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;


    return (
        <div>
            <Header />
            <p className={styles.margin}>A</p>
            <h2 className={styles.title}>Tractors nearby</h2>
            <div className={styles.list}>
                {DummyData.map((item, index) => (
                    <SearchCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        distance={item.distance}
                        price={item.price}
                        available={item.available}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Search;