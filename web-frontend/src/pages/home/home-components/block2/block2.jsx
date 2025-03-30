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
            <div>
                <video
                    src="https://res.cloudinary.com/ddyxqpatx/video/upload/v1743350527/se/wagmlb2pmnuhbzymu7ao.mp4"
                    autoPlay
                    loop
                    muted
                    controls={false}
                />
            </div>
            <div>
                <ul>
                    <li>
                        <h2>Kisaan Ka Digital Saathi</h2>
                    </li>
                    <li>
                        <a href="http://localhost:3000/search" >
                        <button className={styles.button}> Nearby Machinery</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Block2;