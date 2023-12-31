const request = async (method, token, url, data) => {

    const options = {}

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json'
            };
            options.body = JSON.stringify(data);
        }
    }

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        }
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {

        throw result;
    }

    return result;
};

// export const get = request.bind(null, 'GET');
// export const post = request.bind(null, 'POST');
// export const put = request.bind(null, 'PUT');
// export const del = request.bind(null, 'DELETE');
// Partial Application 

export const requestFactory = (token) => {

    if (!token) {
        const serializedAuth = localStorage.getItem('userData');

        if (serializedAuth) {
            const auth = JSON.parse(serializedAuth);
            token = auth.accessToken;
        }
    }

    return {
        get: request.bind(null, 'GET', token),
        post: request.bind(null, 'POST', token),
        put: request.bind(null, 'PUT', token),
        delete: request.bind(null, 'DELETE', token),
    }

}