import { useEffect, useState } from "react";

import * as fruitService from '../../services/fruitService';
import { FruitItem } from "./FruitItem";

export const Catalog = () => {

    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        fruitService.getAllFruit()
            .then(fruit => {
                setFruits(fruit);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <>
            <h2>Fruits</h2>
            <section id="dashboard">
                {fruits.length === 0
                    ? <h2>No fruit info yet.</h2>
                    : fruits.map(fruit => <FruitItem key={fruit._id} fruit={fruit} />)
                }
            </section>
        </>
    )
}