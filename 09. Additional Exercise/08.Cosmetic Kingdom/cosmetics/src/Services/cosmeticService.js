import * as requester from './requester';

export const getAllCosmetics = async () => {
    try {
        const getAll = await requester.get('/data/products?sortBy=_createdOn%20desc');
        return getAll;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addNewProduct = async (productData) => {
    try {
        const newProduct = await requester.post('/data/products', productData);
        return newProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getOneProduct = async (productId) => {
    try {
        const currentProduct = await requester.get(`/data/products/${productId}`);
        return currentProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const editProduct = async (prodcutData, productId) => {
    try {
        const productEdited = await requester.put(`/data/products/${productId}`, prodcutData);
        return productEdited;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        await requester.del(`/data/products/${productId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}