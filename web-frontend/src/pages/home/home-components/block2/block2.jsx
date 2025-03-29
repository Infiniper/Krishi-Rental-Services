import React, { useState } from "react";
import Button1 from "../../../../components/button1/button1"; // Adjust the import path as necessary
import styles from "./block2.module.css";
import InputBox from "../../../../components/input-box/input-box";

const Block2 = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        // Implement search functionality here
        alert(`Searching for: ${searchTerm}`);
    }; 

    return (
        <div className={styles.container}>
            <h2>Which machinery are you looking for?</h2>
            <InputBox placeholder="Enter machinery name" onChange={setSearchTerm}/>
            <Button1 label="Search" onClick={handleSearch}/>
        </div>
    );
};

export default Block2;

