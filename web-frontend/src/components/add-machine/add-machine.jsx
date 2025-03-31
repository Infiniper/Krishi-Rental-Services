import React, { useState } from 'react';
import styles from './add-machine.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const AddMachine = () => {
    const [formData, setFormData] = useState({
        ownerid: '',
        type: '',
        model: '',
        registrationnumber: '',
        status: '',
        price: '',
        date: ''
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setImages(e.target.files); // Store the selected files
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        console.log("Images:", images);
    };

    return (
            <div>
            <Header />
        <div className={styles.box}>

        <form onSubmit={handleSubmit} className={styles.container}>
            <h2>Add New Machine</h2>
            <div className={styles.element}>
                <label>Type:</label>
                <input type="text" name="Type" value={formData.type} onChange={handleChange} />
            </div>
            <div className={styles.element}>
                <label>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} />
            </div>
            <div className={styles.element}>
                <label>Registration Number:</label>
                <input type="text" name="registrationnumber" value={formData.registrationnumber} onChange={handleChange} />
            </div>
            <div className={styles.element}>
                <label>Price (per acre):</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className={styles.images}>
                <label>Images:</label>
                <input type="file" name="images" onChange={handleFileChange} multiple/>
            </div>
            <div className={styles.submit}>
                <button type="submit">Add Machine</button>
            </div>
        </form>
        </div>
        <Footer />
        </div>
    );
};

export default AddMachine;
