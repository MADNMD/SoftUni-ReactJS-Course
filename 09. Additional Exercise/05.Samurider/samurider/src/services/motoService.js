import * as requester from '../services/requester';

export const addMoto = async (motoData) => {

    try {
        const result = await requester.post('/data/motorcycles', motoData);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getAllMoto = async () => {

    try {
        const result = await requester.get('/data/motorcycles?sortBy=_createdOn%20desc');
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getOneMoto = async (motoId) => {

    try {
        const result = requester.get(`/data/motorcycles/${motoId}`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const editMoto = async (motoId, motoData) => {

    try {
        const result = requester.put(`/data/motorcycles/${motoId}`, motoData);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const deleteMoto = async (motoId) => {

    try {
        const result = await requester.del(`/data/motorcycles/${motoId}`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const searchMoto = async (query) => {

    try {
        const result = await requester.get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}