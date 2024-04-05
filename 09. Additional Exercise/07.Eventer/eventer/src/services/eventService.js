import * as requester from '../services/requester';

export const getAllEvents = async () => {
    try {
        const result = await requester.get('/data/events?sortBy=_createdOn%20desc');
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createEvent = async (eventData) => {
    try {
        const result = await requester.post('/data/events', eventData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getOneEvent = async (eventId) => {
    try {
        const result = await requester.get(`/data/events/${eventId}`);
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const editEvent = async (eventData, eventId) => {
    try {
        const result = await requester.put(`/data/events/${eventId}`, eventData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteEvent = async (eventId) => {
    try {
        await requester.del(`/data/events/${eventId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}