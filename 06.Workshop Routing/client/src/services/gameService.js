import * as request from './requester';

const baseUrl = 'http://localhost:3030/jsonstore/games';


export const getAll = async () => {

    const result = await request.get(baseUrl);
    const games =  Object.values(result);

    return games;
};

export const getOne = async (gameId) => {

    const result = await request.get(`${baseUrl}/${gameId}`);
    
    return result;
};

export const editOne = async (gameId, gameData) => {

    const result = await request.put(`${baseUrl}/${gameId}`, gameData);

    return result;
}

export const deleteOne = async (gameId) => {

    const result = await request.del(`${baseUrl}/${gameId}`);

    return result;
}

export const createGame = async (gameData) => {

    const result = await request.post(baseUrl, gameData);
    
    return result;
};

export const addCommnet = async (gameId, data) => {

    const result = await request.post(`${baseUrl}/${gameId}/comments`, data);

    return result;
}