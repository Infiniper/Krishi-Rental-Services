import React from 'react';
import styles from './search-card.module.css';
import Button1 from '../button1/button1';


const SearchCard = ({ image, title, distance, price, available }) => {
    return (
    <div className={styles.container}>
        <img src={image} alt="tractor image"  className={styles.image}/>
        <div className={styles.details}>
        <ul>
            <li className={styles.title}><h2>{title}</h2></li>
            <li className={styles.price}><p>₹{price}/Acre</p></li>
            <li className={styles.distance}><p>{distance} km Away</p></li>
            <li className={styles.available}><p>{available}</p></li>
            <li><Button1 label={"Rent now"} /></li>
        </ul>
        </div>
    </div>
    );
};

export default SearchCard;