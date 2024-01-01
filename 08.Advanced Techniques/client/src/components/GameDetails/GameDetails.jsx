import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { gameServiceFactory } from '../../services/gameService';
import * as commentService from '../../services/commentService';
import { useService } from "../../hooks/useService";
import { useAuthContext } from "../../contexts/AuthContext";

import { AddComment } from "./AddComment";

export const GameDetails = () => {

    const { gameId } = useParams();
    const { userId, isAuthenticated } = useAuthContext();
    const gameService = useService(gameServiceFactory);
    const navigation = useNavigate();
    const [game, setGame] = useState({});

    useEffect(() => {

        Promise.all([
            gameService.getOne(gameId),
            commentService.getAll(gameId),
        ])
            .then(([gameData, comments]) => {
                setGame({
                    ...gameData,
                    comments
                });
              
            });

        // gameService.getOne(gameId)
        //     .then(game => {
        //         setGame(game);
        //     });
    }, [gameId]);// тук подаваме ID-то зашото искаме всеки път когато се натисне бутона details да бъде различно ID.
    // ако се забрави излиза грешка react-hooks/exhaustive-deps -   

    const onSubmitComment = async (values) => {

        const response = await commentService.createComment(gameId, values.comment);
        // setGame(state => ({ ...state, comments: { ...state.comments, commentResult } }));
        // setUsername('');
        // setComment('');

    }

    const isOwner = userId === game._ownerId;

    const onDelete = async () => {

        await gameService.deleteOne(gameId);

        navigation('/catalogue');
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game?.comments && game?.comments.map(comment => (
                            <li key={comment._id} className="comment">
                                <p>{comment.comment}</p>
                            </li>
                        ))}


                    </ul>

                    {/* {!Object.values(game.comments).length === 0 &&
                        <p className="no-comment">No comments.</p>
                    } */}

                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/edit/${gameId}`} className="button">Edit</Link>
                        <a href="#" className="button" onClick={onDelete}>Delete</a>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddComment onSubmitComment={onSubmitComment} />}

        </section>
    )
}