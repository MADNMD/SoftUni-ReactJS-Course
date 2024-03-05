import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as factService from '../../services/factService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from "../../context/AuthContext";
import { DeleteModal } from "../DeleteModal";

export const DetailsFact = () => {

    const [factState, setFactState] = useState({});
    const { factId } = useParams();
    const { isAuthenticated, userId } = useAuthContext();
    const [deleteModal, setDeleteModal] = useState(false);
    const [like, setLike] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        likeService.getAllLikes(factId)
            .then(likeCount => {
                setLike(likeCount);
            })
            .catch(error => console.log(error));
    }, [factId]);

    const handleLike = () => {
        likeService.addLike(factId)
            .then(() => {
                setLike(prevCount => [...prevCount, { _ownerId: userId }]);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onHandleDelete = () => {
        setDeleteModal(true);
    }

    const onCancelHandleDelete = () => {
        setDeleteModal(false);
    }

    const onConfirmDelete = () => {
        try {
            factService.deleteFact(factId);
            navigate(`/catalog`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        factService.getOnfact(factId)
            .then(factData => {
                setFactState(factData);
            })
    }, [factId]);

    const isOwner = factState._ownerId === userId;
    const isLike = like.some(userLike => userLike._ownerId === userId);

    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={factState.imageUrl} alt="example1" />
                    <p id="details-category">{factState.category}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p id="description">{factState.description}</p>
                            <p id="more-info">{factState.moreInfo}</p>
                        </div>

                        <h3>Likes:<span id="likes">{like.length}</span></h3>

                        {isAuthenticated &&
                            <div id="action-buttons">
                                {isOwner
                                    ?
                                    <>
                                        <Link to={`/edit-fact/${factState._id}`} id="edit-btn">Edit</Link>
                                        <Link to="" onClick={onHandleDelete} id="delete-btn">Delete</Link>
                                    </>
                                    : !isLike && <Link to="" onClick={handleLike} id="like-btn">Like</Link>
                                }
                                {isLike
                                    ? <span id="like-btn">You have already like</span>
                                    : null
                                }
                            </div>
                        }
                    </div>
                </div>
            </section>
            {deleteModal
                ? <DeleteModal isCancel={onCancelHandleDelete} isConfirm={onConfirmDelete} />
                : null
            }
        </>
    )
}