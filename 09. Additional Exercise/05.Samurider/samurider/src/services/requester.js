const baseURL = 'http://localhost:3030';

async function request(url, option) {

    try {

        const response = await fetch(baseURL + url, option);

        if (response.ok !== true) {
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOption(method = 'get', data) {

    const option = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        option['Content-type'] = 'Application/json';
        option.body = JSON.stringify(data);
    }

    const userData = localStorage.getItem('userData');

    if (userData) {
        const getUserData = JSON.parse(userData);
        const token = getUserData.accessToken;

        if (token) {
            option.headers['X-Authorization'] = token;
        }
    }
    return option;
}

export function get(url) {
    return request(url, createOption());
}

export function post(url, data) {
    return request(url, createOption('post', data));
}

export function put(url, data) {
    return request(url, createOption('put', data));
}

export function del(url) {
    return request(url, createOption('delete'));
}