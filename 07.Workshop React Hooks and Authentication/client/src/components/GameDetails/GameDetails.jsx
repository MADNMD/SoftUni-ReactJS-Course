import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { gameServiceFactory } from '../../services/gameService'
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const GameDetails = () => {

    const { userId } = useContext(AuthContext);
    const gameService = useService(gameServiceFactory);
    const { gameId } = useParams();
    const navigation = useNavigate();
    const [game, setGame] = useState({});
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
   
    useEffect(() => {
        gameService.getOne(gameId)
            .then(game => {
                setGame(game);
            });
    }, [gameId]);// тук подаваме ID-то зашото искаме всеки път когато се натисне бутона details да бъде различно ID.
    // ако се забрави излиза грешка react-hooks/exhaustive-deps -   

    const onSubmitComment = async (event) => {
        event.preventDefault();

        const commentResult = await gameService.addCommnet(gameId, { username, comment });

        setGame(state => ({ ...state, comments: { ...state.comments, commentResult } }));
        setUsername('');
        setComment('');

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
                        {game.comments && Object.values(game.comments).map(comment => (
                            <li key={comment._id} className="comment">
                                <p>{comment.username}: {comment.comment}</p>
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

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmitComment}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="User"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    )
}