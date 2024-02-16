import React from "react";
import styles from './CreatePage.module.css';
import { useNavigate } from 'react-router-dom';

import * as petService from '../../services/petsService';
import { useForm } from "../../hooks/useForm";

export const CreatePage = () => {

    const navigate = useNavigate();
    const { values, changeHandler, onSubmit } = useForm({
        name: '',
        breed: '',
        age: '',
        weight: '',
        image: '',
    }, handleSubmit);

    function handleSubmit(petData) {
        petService.createPet(petData)
            .then(() => {
                navigate('/catalog')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <section id={styles.createPage}>
            <form method="POST" onSubmit={onSubmit} className={styles.createForm}>
                <img src="./images/cat-create.jpg" />
                <div>
                    <h2>Create PetPal</h2>
                    <div className={styles.name}>
                        <label htmlFor="name">Name:</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Max"
                            value={values.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.breed}>
                        <label htmlFor="breed">Breed:</label>
                        <input
                            name="breed"
                            id="breed"
                            type="text"
                            placeholder="Shiba Inu"
                            value={values.breed}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.age}>
                        <label htmlFor="age">Age:</label>
                        <input
                            name="age"
                            id="age"
                            type="text"
                            placeholder="2 years"
                            value={values.age}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.weight}>
                        <label htmlFor="weight">Weight:</label>
                        <input
                            name="weight"
                            id="weight"
                            type="text"
                            placeholder="5kg"
                            value={values.weight}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.image}>
                        <label htmlFor="image">Image:</label>
                        <input
                            name="image"
                            id="image"
                            type="text"
                            placeholder="./image/dog.jpeg"
                            value={values.image}
                            onChange={changeHandler}
                        />
                    </div>
                    <button className={styles.btn} type="submit">Create Pet</button>
                </div>
            </form>
        </section>
    )
}