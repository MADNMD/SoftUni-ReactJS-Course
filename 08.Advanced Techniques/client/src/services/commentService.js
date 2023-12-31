import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

const request = requestFactory();


export const getAll = async (gameId) => {


    // const query = encodeURIComponent(`gameId=${gameId}`);
    const query = encodeURIComponent(`gameId="${gameId}"`);
    // const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${query}`);
    const comments = Object.values(result);

    return comments;
}

export const createComment = async (gameId, comment) => {

    const result = await request.post(baseUrl, { gameId, comment });

    return result;
} 