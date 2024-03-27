import * as requester from '../services/requester';

export const addFruit = async (fruitData) => {

    try {
        const addFruit = await requester.post('/data/fruits', fruitData);
        return addFruit;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getAllFruit = async () => {

    try {
        const allFruit = await requester.get('/data/fruits?sortBy=_createdOn%20desc');
        return allFruit
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getOneFruit = async (fruitId) => {

    try {
        const fruit = await requester.get(`/data/fruits/${fruitId}`);
        return fruit;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const editFruit = async (fruitId, fruitData) => {

    try {
        const editFruit = await requester.put(`/data/fruits/${fruitId}`, fruitData);
        return editFruit;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const deleteFruit = async (fruitId) => {

    try {
        await requester.del(`/data/fruits/${fruitId}`);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const searchFruit = async (query) => {

    try {
        const search = await requester.get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
        return search;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
} 