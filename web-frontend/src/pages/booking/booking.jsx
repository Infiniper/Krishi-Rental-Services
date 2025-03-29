import React from "react";
import DummyData from "../search/components/dummy-data";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import styles from "./booking.module.css";
import Button1 from "../../components/button1/button1";




const Booking = ({image, type, model, status, owner, price, registration, discription}) => {

    return (
        <div className={styles.container}>
            <Header />
            <p className={styles.margin}>margin</p>
            <h1>Booking Details</h1>
            <div className={styles.box}>
            <img src={image} alt="Machinery_Image" />
            <div className={styles.details}>
                <div className={styles.types}>
                    <h2>{type}</h2>
                    <h3>{status}</h3>
                </div>
                <div className={styles.booking}>
                <h3 className={styles.model}>{model}</h3>
                <Button1 
                    label={"Book now"}
                />
                </div>
                <h3 className={styles.price}>₹{price}</h3>
                <ul className={styles.further}>
                    <li className={styles.owner}>{owner}</li>
                    <li>{registration}</li>
                    <li>{discription}</li>
                </ul>
            </div>

            </div>
            <Footer />
        </div>
    );
}

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