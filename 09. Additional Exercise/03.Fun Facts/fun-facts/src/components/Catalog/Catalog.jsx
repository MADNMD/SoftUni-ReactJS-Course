import { useEffect, useState } from "react";

import * as factService from '../../services/factService';
import { FactItem } from "./FactItem";

export const Catalog = () => {

    const [factsState, setFactsState] = useState([]);

    useEffect(() => {
        factService.getAllFacts()
            .then(facts => {
                setFactsState(facts);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <>
            <h2>Fun Facts</h2>
                {factsState.length === 0
                    ? <h2>No Fun Facts yet.</h2>
                    : <section id="dashboard">
                        {factsState.map(fact => <FactItem key={fact._id} fact={fact} />)}
                    </section>
                }
        </>
    )
}