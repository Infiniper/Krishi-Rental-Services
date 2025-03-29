import React from "react";
import DummyData from "../search/components/dummy-data";

const Booking = () => {

    return (
        <div>
            <h2>Booking Details</h2>
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
    );
}