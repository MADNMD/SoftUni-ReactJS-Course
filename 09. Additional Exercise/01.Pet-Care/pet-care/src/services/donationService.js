import * as requester from '../services/requester';

export const addDonation = async (petId) => {

    try {
        const donationPet = await requester.post('/data/donation', { petId });
        return donationPet;
    } catch (error) {
        throw error;
    }
}

export const getTotalDonation = async (petId) => {

    try {
        const totalDonation = await requester.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&coun`);
        return totalDonation;
    } catch (error) {
        throw error;
    }
}

export const getUserDonation = async (petId, userId) => {

    try {
        const userDonation = await requester.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        return userDonation;
    } catch (error) {
        throw error;
    }
}