import React from "react";
import MachineLog from "../../../../components/machine-log/machine-log";
import styles from "./machines.module.css";

const Machines = () => {
    return (
        <div className={styles.container}>
            <p >a</p>
            <h2>Your Machines</h2>
            <h3>Active</h3>
            <MachineLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />
            <MachineLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />
            <h3>Inactive</h3>
            <MachineLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />            <MachineLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />            <MachineLog
            image = "https://res.cloudinary.com/ddyxqpatx/image/upload/v1742323276/se/ado74ttv1bqwi8nj7irz.jpg"
            type = "Tractor"
            model = "Tata Hanthi"
            registration = "AP 420 420" 
            available = "available"
            price="5000"
            date="31/03/2025"
            />

        </div>
    );
};

export default Machines;