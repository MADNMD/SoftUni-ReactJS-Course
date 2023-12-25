import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import * as gameService from '../../services/gameService';

export const EditGame = () => {

    const navigate = useNavigate();

    const { gameId } = useParams();

    const [editGame, setEditGame] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    });

    useEffect(() => {
        gameService.getOne(gameId)
            .then(game => {
                setEditGame(game)
            })
    }, [gameId]);

    const onChangeHandler = (event) => {
        setEditGame(game => ({ ...game, [event.target.name]: event.target.value }));
    }

    const onSumbit = async (event) => {
        event.preventDefault();

        await gameService.editOne(gameId, editGame);

        navigate(`/catalogue/${gameId}`);
    }


    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSumbit}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={editGame.title}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={editGame.category}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        value={editGame.maxLevel}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={editGame.imageUrl}
                        onChange={onChangeHandler}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={editGame.summary}
                        onChange={onChangeHandler}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}