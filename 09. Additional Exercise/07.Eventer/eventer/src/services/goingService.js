import * as requester from '../services/requester';

export const addGoing = async (eventId) => {
    try {
        const result = await requester.post('/data/going', { eventId });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllGoing = async (eventId) => {
    try {
        const result = await requester.get(`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&coun`);
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}