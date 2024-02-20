import React, { useEffect, useState } from "react";
import styles from './DetailsPage.module.css';
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import * as petService from '../../services/petsService';
import * as donationService from '../../services/donationService';
import { DeleteModal } from "../DeleteModal";

export const DetailsPage = () => {

    const { isAuthenticated, userId } = useAuthContext();
    const { petId } = useParams();
    const navigate = useNavigate()
    const [pet, setPet] = useState({});
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [donationCount, setDonationCount] = useState([]);

    useEffect(() => {
        donationService.getTotalDonation(petId)
            .then(count => {
                setDonationCount(count)
            })
            .catch(error => console.log(error))
    }, [petId]);

    const handlerDonation = () => {
        donationService.addDonation(petId)
            .then(() => setDonationCount(prevCount => [...prevCount, { _ownerId: userId }]))
    }

    useEffect(() => {
        petService.getOnePet(petId)
            .then(petData => {
                setPet(petData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [petId]);

    const isOwner = userId === pet._ownerId;
    const isDonation = donationCount.some(donation => donation._ownerId === userId);

    const handleDelete = () => {
        setIsDeleteModal(true);
    }

    const handleCancelDelete = () => {
        setIsDeleteModal(false);
    }

    const confirtDeletePet = () => {
        petService.deletePet(petId);
        setIsDeleteModal(false);
        navigate('/catalog');

    }

    return (
        <>
            <section id={styles.detailsPage}>
                <div className={styles.details}>
                    <div className={styles.animalPic}>
                        <img src={pet.image} />
                    </div>
                    <div>
                        <div className={styles.animalInfo}>
                            <h1>Name: {pet.name}</h1>
                            <h3>Breed: {pet.breed}</h3>
                            <h4>Age: {pet.age}</h4>
                            <h4>Weight: {pet.weight}</h4>
                            <h4 className={styles.donation}>Donation: {donationCount.length * 100}$</h4>
                        </div>
                        {isAuthenticated &&
                            <div className={styles.actionBtn}>
                                {isOwner
                                    ?
                                    <>
                                        <Link to={`/edit/${petId}`} className={styles.edit}>Edit</Link>
                                        <Link onClick={handleDelete} to="#" className={styles.remove}>Delete</Link>
                                    </>
                                    : !isDonation && <Link onClick={handlerDonation} to="#" className={styles.donate}>Donate</Link>
                                }
                                {isDonation
                                    ? <Link className={styles.donate}>You have already donated!</Link>
                                    : null
                                }
                            </div>
                        }
                    </div>
                </div>
            </section>
            {isDeleteModal
                ? <DeleteModal isCancel={handleCancelDelete} isConfirm={confirtDeletePet} />
                : null
            }
        </>
    )
}