import * as requester from './requester';

export const addLike = async (charId) => {
    
    try {
        const result = await requester.post('/data/useful', { characterId: charId });
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getTotalLike = async (charId) => {

    try {
        const result = await requester.get(`/data/useful?where=characterId%3D%22${charId}%22&distinct=_ownerId&coun`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getUserLike = async (charId, userId) => {

    try {
        const result = await requester.get(`/data/useful?where=characterId%3D%22${charId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}