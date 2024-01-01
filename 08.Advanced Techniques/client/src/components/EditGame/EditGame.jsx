import { useForm } from "../../hooks/useForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import * as gameService from '../../services/gameService';
import { useService } from "../../hooks/useService";
import { gameServiceFactory } from "../../services/gameService";

export const EditGame = ({
    onEditGameSubmit,
}) => {

    const { gameId } = useParams();
    const gameService = useService(gameServiceFactory);
    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    }, onEditGameSubmit);

    const navigate = useNavigate();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(game => {
                changeValues(game)
            })
    }, [gameId]);

    // const onSumbit = async (event) => {
    //     event.preventDefault();

    //     await gameService.editOne(gameId, editGame);

    //     navigate(`/catalogue/${gameId}`);
    // }


    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="PUT" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={values.category}
                        onChange={changeHandler}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        value={values.maxLevel}
                        onChange={changeHandler}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={values.summary}
                        onChange={changeHandler}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}