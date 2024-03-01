import { useEffect, useState } from "react";

import * as characterService from '../../services/characterService';
import { DashboardItem } from "./DashboardItem";

export const Dashboard = () => {

    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        characterService.getAllCharacters()
            .then(allHeroes => {
                setHeroes(allHeroes)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <>
            <h2>Characters</h2>
            {heroes.length === 0
                ? <h2>No added Heroes yet.</h2>
                : <section id="characters">
                    {heroes.map(hero => <DashboardItem key={hero._id} hero={hero} />)}
                </section>
            }
        </>
    )
}