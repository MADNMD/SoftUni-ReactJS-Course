import * as requester from './requester';

export const createCharacter = async (charData) => {

    try {
        const result = await requester.post('/data/characters', charData);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getAllCharacters = async () => {

    try {
        const result = await requester.get('/data/characters?sortBy=_createdOn%20desc');
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getOneCharacter = async (charId) => {

    try {
        const result = await requester.get(`/data/characters/${charId}`);
        return result;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const editCharacter = async (charId, charData) => {

    try {
        const result = await requester.put(`/data/characters/${charId}`, charData);
        return result
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const deleteCharacter = async (charId) => {

    try {
        await requester.del(`/data/characters/${charId}`);
    } catch (error) {
        console.log(error)
        throw error;
    }
}