import * as requester from './reauester';

export const login = (userData) => {

    try {
        const result = requester.post('/users/login', userData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const register = (userData) => {

    try {
        const result = requester.post('/users/register', userData);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const logout = () => {

    try {
        requester.get('/users/logout');
    } catch (error) {
        console.log(error);
        throw error;
    }
}