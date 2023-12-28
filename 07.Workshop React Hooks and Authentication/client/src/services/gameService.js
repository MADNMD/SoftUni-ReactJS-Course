import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/games';

export const gameServiceFactory = (token) => {

    const request = requestFactory(token);

    const getAll = async () => {

        const result = await request.get(baseUrl);
        const games = Object.values(result);

        return games;
    };

    const getOne = async (gameId) => {

        const result = await request.get(`${baseUrl}/${gameId}`);

        return result;
    };

    const editOne = async (gameId, gameData) => {

        const result = await request.put(`${baseUrl}/${gameId}`, gameData);

        return result;
    }

    const deleteOne = async (gameId) => {

        const result = await request.delete(`${baseUrl}/${gameId}`);

        return result;
    }

    const createGame = async (gameData) => {

        const result = await request.post(baseUrl, gameData);

        return result;
    };

    const addCommnet = async (gameId, data) => {

        const result = await request.post(`${baseUrl}/${gameId}/comments`, data);

        return result;
    }

    return {
        getAll,
        getOne,
        editOne,
        deleteOne,
        createGame,
        addCommnet,
    }
}