import { useEffect, useState } from "react";

import * as carService from '../../services/carService';
import { Item } from "./Item";

export const Dashboard = () => {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        carService.getAllCars()
            .then(allCars => {
                setCars(allCars);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <>
            <h3 className="heading">Our Cars</h3>
            <section id="dashboard">

                {cars.length !== 0
                    ? cars.map(car => <Item key={car._id} car={car} />)
                    : <h3 className="nothing">Nothing to see yet</h3>
                }

            </section>

        </>
    )
}