import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import * as motoService from '../../services/motoService';
import { DeleteModal } from "../DeleteModal/DeleteModal";

export const DetailsPage = () => {

    const [moto, setMoto] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const { motoId } = useParams();
    const { userId } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        motoService.getOneMoto(motoId)
            .then(motoData => {
                setMoto(motoData);
            })
            .catch(error => console.log(error));
    }, [motoId]);

    const isOwner = userId === moto._ownerId;

    const handleDelete = () => {
        setDeleteModal(true);
    }

    const cancelDeleteModal = () => {
        setDeleteModal(false);
    }

    const confirmDeleteModal = () => {
        try {
            motoService.deleteMoto(motoId);

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
                    <img id="details-img" src={moto.imageUrl} alt="example1" />
                    <p id="details-title">{moto.model}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p className="year">Year: {moto.year}</p>
                            <p className="mileage">Mileage: {moto.mileage} km.</p>
                            <p className="contact">Contact Number: {moto.contact}</p>
                            <p id="motorcycle-description">{moto.about}</p>
                        </div>
                        {isOwner &&
                            <div id="action-buttons">
                                <Link to={`/edit-page/${moto._id}`} id="edit-btn">Edit</Link>
                                <Link onClick={handleDelete} to="" id="delete-btn">Delete</Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
            {deleteModal ? <DeleteModal isCancel={cancelDeleteModal} isConfirm={confirmDeleteModal} /> : null}
        </>
    )
}