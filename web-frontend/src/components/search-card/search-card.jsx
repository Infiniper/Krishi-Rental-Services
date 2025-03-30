import React from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from './search-card.module.css';
import Button1 from '../button1/button1';


const SearchCard = ({ id, image, title, distance, price, available }) => {
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle navigation
    const handleClick = () => {
        navigate(`/booking/${id}`); // Redirect to booking page with ID
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            {/* <img src={image} alt="tractor image" className={styles.image} /> */}
            <div className={styles.imageContainer}><img src={image} alt="tractor image"  className={styles.image}/></div>
            <div className={styles.details}>
                <ul>
                    <li className={styles.title}><h2>{title}</h2></li>
                    <li className={styles.price}><p>₹{price}/Acre</p></li>
                    <li className={styles.distance}><p>{distance} km Away</p></li>
                    <li className={styles.available}><p>{available}</p></li>
                    <li>
                        <Button1 label={"Rent now"} onClick={handleClick} /> 
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchCard;