import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as eventService from '../../services/eventService';
import * as goingService from '../../services/goingService';
import { useAuthContext } from "../../contexts/AuthContext";
import { DeleteModal } from "../DeleteModal";

export const Details = () => {

    const [event, setEvent] = useState({});
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [going, setGoing] = useState([]);
    const { eventId } = useParams();
    const { isAuthenticated, userId } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        goingService.getAllGoing(eventId)
            .then(count => {
                setGoing(count);
            })
            .catch(error => {
                console.log(error)
            })
    }, [eventId]);

    const handleGoing = () => {
        goingService.addGoing(eventId)
            .then(() => {
                setGoing(prevCount => [...prevCount, { _ownerId: userId }]);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const isOwner = event._ownerId === userId;
    const isGoing = going.some(userGoing => userGoing._ownerId === userId);

    useEffect(() => {
        eventService.getOneEvent(eventId)
            .then(eventData => {
                setEvent(eventData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [eventId]);

    const handleDeleteBtn = () => {
        setIsDeleteModal(true);
    }

    const handleCancelDeleteBtn = () => {
        setIsDeleteModal(false);
    }

    const confirmDelete = () => {
        eventService.deleteEvent(eventId)
        setIsDeleteModal(false);
        navigate('/dashboard');
    }

    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={event.imageUrl} alt="example1" />
                    <p id="details-title">{event.name}</p>
                    <p id="details-category">
                        Category: <span id="categories">{event.category}</span>
                    </p>
                    <p id="details-date">
                        Date:<span id="date">{event.date}</span></p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <span>{event.description}</span>
                        </div>

                    </div>

                    <h3>Going: <span id="go">{going.length}</span> times.</h3>
                    {isAuthenticated &&
                        <div id="action-buttons">
                            {isOwner
                                ? <>
                                    <Link to={`/edit/${event._id}`} id="edit-btn">Edit</Link>
                                    <Link onClick={handleDeleteBtn} id="delete-btn">Delete</Link>
                                    {/* <Link onClick={handleGoing} id="go-btn">Going</Link> */}
                                </>
                                : !isGoing && <Link onClick={handleGoing} id="go-btn">Going</Link>
                            }
                            {isGoing
                                ? <span id="go-btn">You have already going</span>
                                : null
                            }
                        </div>
                    }

                </div>
            </section>
            {isDeleteModal
                ? <DeleteModal isConfirm={confirmDelete} isCancel={handleCancelDeleteBtn} />
                : null
            }
        </>
    )
}