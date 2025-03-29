import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SearchCard from "../../components/search-card/search-card";
import DummyData from "./components/dummy-data";
import styles from "./search.module.css";

const Search = () => {
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