import * as requester from './requester';

export const getAllPets = async () => {

    try {
        const allPets = await requester.get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
        return allPets;
    } catch (error) {
        throw error;
    }
}

export const getOnePet = async (petId) => {

    try {
        const onePet = await requester.get(`/data/pets/${petId}`);
        return onePet;
    } catch (error) {
        throw error;
    }
}

export const createPet = async (petData) => {

    try {
        const newPet = await requester.post('/data/pets', petData);
        return newPet
    } catch (error) {
        throw error;
    }
}

export const editPet = async (petData, petId) => {

    try {
        const editPet = await requester.put(`/data/pets/${petId}`, petData);
        return editPet;
    } catch (error) {
        throw error;
    }
}

export const deletePet = async (petId) => {

    try {
        await requester.del(`/data/pets/${petId}`);
    } catch (error) {
        throw error;
    }
}