import * as requester from './requester';

export const addLike = async (factId) => {

    try {
        const result = await requester.post('/data/likes', { factId: factId });
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const getAllLikes = async (factId) => {

    try {
        const result = await requester.get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&coun`);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const getAllUserLikes = async (factId, userId) => {

    try {
        const result = await requester.get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}