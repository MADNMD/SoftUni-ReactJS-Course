import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";

import * as carService from '../../services/carService';
import { useAuthContext } from "../../context/AuthContext";
import { DeleteModal } from "../DeleteModal";

export const DetailsPage = () => {

    const [car, setCar] = useState({});
    const { carId } = useParams();
    const { userId } = useAuthContext();
    const [deleteModal, setDeleteModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        carService.getOneCar(carId)
            .then(carData => {
                setCar(carData);
            })
            .catch(error => console.log(error));
    }, [carId]);

    const isOwner = car._ownerId === userId;

    const handleDeleteModal = () => {
        setDeleteModal(true);
    }

    const handleCancelDeleteModal = () => {
        setDeleteModal(false);
    }

    const confirmDeleteModal = () => {
        carService.deleteCar(carId)
            .then(() => {
                setDeleteModal(false);
                navigate('/catalog');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={car.imageUrl} alt="example1" />
                    <p id="details-title">{car.model}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p className="price">Price: {car.price}</p>
                            <p className="weight">Weight: {car.weight} kg</p>
                            <p className="top-speed">Top Speed: {car.speed} kph</p>
                            <p id="car-description">{car.about}</p>
                        </div>

                        {isOwner
                            ? <div id="action-buttons">
                                <Link to={`/edit-page/${car._id}`} id="edit-btn">Edit</Link>
                                <Link onClick={handleDeleteModal} to="" id="delete-btn">Delete</Link>
                            </div>
                            : null
                        }

                    </div>
                </div>
            </section>
            {deleteModal
                ? <DeleteModal isCancel={handleCancelDeleteModal} isConfirm={confirmDeleteModal} />
                : null
            }
        </>
    )
}