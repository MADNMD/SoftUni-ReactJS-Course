import * as requester from '../Services/requester';

export const addBuy = async (producId) => {
    try {
        const buy = await requester.post(`/data/bought`, { producId });
        return buy;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllBuy = async (productId) => {
    try {
        const getBuy = await requester.get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&coun`);
        return getBuy;
    } catch (error) {
        console.log(error);
        throw error;
    }
}