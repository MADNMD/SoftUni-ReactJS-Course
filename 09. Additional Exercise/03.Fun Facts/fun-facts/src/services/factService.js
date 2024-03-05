import * as requester from './requester';

export const createFact = async (factData) => {

    try {
        const result = await requester.post('/data/facts', factData);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const getAllFacts = async () => {

    try {
        const result = await requester.get('/data/facts?sortBy=_createdOn%20desc');
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const getOnfact = async (factId) => {

    try {
        const result = await requester.get(`/data/facts/${factId}`);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const editFact = async (factId, factData) => {

    try {
        const result = await requester.put(`/data/facts/${factId}`, factData);
        return result;
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

export const deleteFact = async (factId) => {

    try {
        await requester.del(`/data/facts/${factId}`);
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}