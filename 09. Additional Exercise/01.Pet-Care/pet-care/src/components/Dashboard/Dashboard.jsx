import React, { useEffect, useState } from "react";
import styles from './Dashboard.module.css';

import * as petsService from '../../services/petsService';
import { PetItem } from "./PetItem/PetItem";

export const Dashboard = () => {

    const [allPets, setAllPets] = useState([]);

    useEffect(() => {
        petsService.getAllPets()
            .then(result => {
                setAllPets(result)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <section id={styles.dashboard}>
            <h2 className={styles['dashboard-title']}>Services for every animal</h2>
            <div className={styles['animals-dashboard']}>

                {allPets.length === 0
                    ? <div>
                        <p className={styles['no-pets']}>No pets in dashboard</p>
                    </div>
                    : allPets.map(pet => <PetItem key={pet._id} pet={pet} />)
                }
            </div>
        </section>
    )
}