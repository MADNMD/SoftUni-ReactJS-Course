import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as fruitSetvice from '../../services/fruitService';
import { useAuthContext } from "../../contexts/AuthContext";
import { DeleteModal } from "../DeleteModal";


export const DetailsPage = () => {

    const [fruit, setFruit] = useState({});
    const { fruitId } = useParams();
    const { isAuthenticated, userId } = useAuthContext();
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fruitSetvice.getOneFruit(fruitId)
            .then(fruitData => {
                setFruit(fruitData);
            })
            .catch(error => console.log(error));
    }, [fruitId]);

    const isOwner = userId === fruit._ownerId;

    const onHandleDelete = () => {
        setDeleteModal(true);
    }

    const cancelHandleDelete = () => {
        setDeleteModal(false);
    }

    const confirmDeleteModal = () => {

        try {
            fruitSetvice.deleteFruit(fruitId);

            setDeleteModal(false);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={fruit.imageUrl} alt="example1" />
                    <p id="details-title">{fruit.name}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p>{fruit.description}</p>
                            <p id="nutrition">Nutrition</p>
                            <p id="details-nutrition">{fruit.nutrition}</p>
                        </div>
                        {isAuthenticated && isOwner &&
                            <div id="action-buttons">
                                <Link to={`/edit-page/${fruit._id}`} id="edit-btn">Edit</Link>
                                <Link onClick={onHandleDelete} to="" id="delete-btn">Delete</Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
            {deleteModal ? <DeleteModal isCancel={cancelHandleDelete} isConfirm={confirmDeleteModal} /> : null}
        </>
    )
}