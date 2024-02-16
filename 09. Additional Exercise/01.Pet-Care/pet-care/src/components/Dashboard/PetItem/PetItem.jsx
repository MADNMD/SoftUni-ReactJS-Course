import React from 'react';
import styles from './PetItem.module.css';
import { Link } from 'react-router-dom';

export const PetItem = ({
    pet,
}) => {
    return (
        <div className={styles['animals-board']}>
            <article className={styles['service-img']}>
                <img className={styles['animal-image-cover']} src={pet.image} />
            </article>
            <h2 className={styles.name}>{pet.name}</h2>
            <h3 className={styles.breed}>{pet.breed}</h3>
            <div className={styles.action}>
                <Link className={styles.btn} to={`/details/${pet._id}`}>Details</Link>
            </div>
        </div>
    )
}