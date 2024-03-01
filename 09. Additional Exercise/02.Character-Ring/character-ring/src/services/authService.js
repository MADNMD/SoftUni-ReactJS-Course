import * as requester from './requester';

export const login = async (userData) => {

    try {
        const result = await requester.post('/users/login', userData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const register = async (userData) => {

    try {
        const result = await requester.post('/users/register', userData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const logout = async () => {
    await requester.get('/users/logout');
}