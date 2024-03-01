import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as characterService from '../../services/characterService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from "../../context/AuthContext";
import { DeleteModal } from "../DeleteModal";

export const DetailsPage = () => {

    const [hero, setHero] = useState({});
    const { charId } = useParams();
    const { isAuthenticated, userId } = useAuthContext();
    const navigate = useNavigate();
    const [like, setLike] = useState([]);
    const [isDeleteModal, setIsDeteleModal] = useState(false);

    useEffect(() => {
        likeService.getTotalLike(charId)
            .then(count => {
                setLike(count)
            })
            .catch(error => {
                console.log(error)
            })
    }, [charId])

    const handlerLike = () => {
        likeService.addLike(charId)
            .then(() => {
                setLike(prevCount => [...prevCount, { _ownerId: userId }])
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log(like);
    }, [like]);

    useEffect(() => {
        characterService.getOneCharacter(charId)
            .then(heroData => {
                setHero(heroData)
            })
            .catch(error => {
                console.log(error);
            })
    }, [charId])

    const isOwner = hero._ownerId === userId;
    const isLike = like.some(userLike => userLike._ownerId === userId);

    const handleDelete = () => {
        setIsDeteleModal(true);
    }

    const handleCancelDelete = () => {
        setIsDeteleModal(false);
    }

    const confirmDelete = () => {
        characterService.deleteCharacter(charId);
        setIsDeteleModal(false);
        navigate('/catalog');
    }

    return (
        <>
            <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src={hero.imageUrl} alt="example1" />
                    <div>
                        <p id="details-category">{hero.category}</p>
                        <div id="info-wrapper">
                            <div id="details-description">
                                <p id="description">{hero.description}</p>
                                <p id="more-info">{hero.moreInfo}</p>
                            </div>
                        </div>
                        <h3>Is This Useful:<span id="likes">{like.length}</span></h3>

                        {isAuthenticated &&
                            <div id="action-buttons">
                                {isOwner
                                    ? <>
                                        <Link to={`/edit-page/${charId}`} id="edit-btn">Edit</Link>
                                        <Link onClick={handleDelete} id="delete-btn">Delete</Link>
                                    </>
                                    : !isLike && <Link onClick={handlerLike} id="like-btn">Like</Link>
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
            {isDeleteModal
                ? <DeleteModal isCancel={handleCancelDelete} isConfirm={confirmDelete} />
                : null
            }
        </>
    )
}