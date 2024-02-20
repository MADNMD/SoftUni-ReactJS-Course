import React, { useEffect } from "react";
import styles from './EditPage.module.css';
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from '../../hooks/useForm';
import * as petService from '../../services/petsService';

export const EditPage = () => {

    const { petId } = useParams();
    const navigate = useNavigate();
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        name: '',
        breed: '',
        age: '',
        weight: '',
        image: '',
    }, onEditHandler);

    function onEditHandler() {
        petService.editPet(values, petId)
        navigate(`/details/${petId}`);
    }

    useEffect(() => {
        petService.getOnePet(petId)
            .then(pet => {
                changeValues(pet)
            })
            .catch(error => {
                console.log(error)
            })
    }, [petId]);

    return (
        <section id={styles.editPage}>
            <form method="PUT" onSubmit={onSubmit} className={styles.editForm}>
                <img src="../public/images/editpage-dog.jpg" />
                <div>
                    <h2>Edit PetPal</h2>
                    <div className={styles.name}>
                        <label htmlFor="name">Name:</label>
                        <input
                            name="name"
                            id="name"
                            type="text"
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
                            value={values.breed}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles.Age}>
                        <label htmlFor="age">Age:</label>
                        <input
                            name="age"
                            id="age"
                            type="text"
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
                            value={values.image}
                            onChange={changeHandler}
                        />
                    </div>
                    <button className={styles.btn} type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
    )
}