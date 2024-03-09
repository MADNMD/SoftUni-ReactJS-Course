import * as requester from '../services/reauester';

export const addCarr = async (carData) => {

    try {
        const result = await requester.post('/data/cars', carData);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getAllCars = async () => {

    try {
        const result = await requester.get('/data/cars?sortBy=_createdOn%20desc');
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getOneCar = async (carId) => {

    try {
        const result = await requester.get(`/data/cars/${carId}`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const editCar = async (carId, carData) => {

    try {
        const result = await requester.put(`/data/cars/${carId}`, carData);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const deleteCar = async (carId) => {

    try {
        await requester.del(`/data/cars/${carId}`);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const searchCars = async (query) => {

    try {
        const result = await requester.get(`/data/cars?where=model%20LIKE%20%22${query}%22`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}