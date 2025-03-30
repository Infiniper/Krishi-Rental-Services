import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting URL params
import API from "../../api/axiosInstance";
import DummyData from "../search/components/dummy-data";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./booking.module.css";
import Button1 from "../../components/button1/button1";

const Booking = () => {
    const { id } = useParams(); // Get machinery ID from URL
    const [machinery, setMachinery] = useState(null);

    useEffect(() => {
        const fetchMachinery = async () => {
            try {
                const response = await API.get(`/machinery/${id}`); // Fetch single machinery
                setMachinery(response.data);
            } catch (error) {
                console.error("Error fetching machinery details:", error);
            }
        };

        fetchMachinery();
    }, [id]);

    if (!machinery) return <h2>Loading...</h2>;

    return (
        <div className={styles.container}>
            <Header />
            <p className={styles.margin}>margin</p>
            <h1>Booking Details</h1>
            <div className={styles.box}>
                <img src={machinery.images[0]} alt="Machinery_Image" />
                <div className={styles.details}>
                    <div className={styles.types}>
                        <h2>{machinery.type}</h2>
                        {/* <h3>{machinery.status}</h3> */}
                        <h3 className={styles.status}>{machinery.status}</h3>
                    </div>
                    <div className={styles.booking}>
                        <h3 className={styles.model}>{machinery.model}</h3>
                        <Button1 label={"Book now"} />
                    </div>
                    <h3 className={styles.price}>{machinery.price}</h3>
                    <ul className={styles.further}>
                        {/* <li className={styles.owner}>{machinery.ownername}</li> */}
                        <li className={styles.owner}>Owner ID: {machinery.ownerid}</li>
                        <li>{machinery.registrationnumber}</li>
                        <li>{machinery.description}</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

/*
Img
Machinery type
Model
Status
Owner name
Price
Ragistration no
Description
*/

export default Booking;