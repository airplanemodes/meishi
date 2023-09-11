import { axiosRequest, serverAddress } from './api';

let user = {};

export const updateUserData = async() => {
    // is there a token?
    if (localStorage.localToken) {
        try {
            // is the token valid?
            let url = serverAddress+"/users/info/";
            let data = await axiosRequest(url, "GET");

            // success, assign the data
            if (data._id) user = data;

            // token invalid or expired, remove it
            else {
                localStorage.removeItem('localToken');
                user = {};
            }
        
            return user;
        }
        
        catch (error) {
            localStorage.removeItem('localToken');
            user = {};
            return user;
        }
    }
    
    else {
        // there is no token at all
        user = {};
        return user;
    }
}


export const returnUserData = () => {
    return user;
}


export const addFavoriteCard = async(businessCardNum) => {
    let tempArr = [...user.cards, businessCardNum];

    // removes duplicates
    tempArr = new Set([...tempArr]);

    user.cards.splice(0, user.cards.length, ...tempArr);

    try {
        let url = serverAddress+"/users/cards/";
        let data = await axiosRequest(url, "PATCH", {cards: user.cards});
        return data;
    }
    
    catch (error) {
        console.log(error);
        throw error;
    }
}


export const removeFavoriteCard = async(businessCardNum) => {
    /* filter runs on user.cards array and returns each item,
       excluding one with the bsnNumber that user want to remove */ 
    let tempArr = user.cards.filter(item => item !== businessCardNum);
    user.cards.splice(0, user.cards.length, ...tempArr);

    try {
        let url = serverAddress+"/users/cards/";
        let data = await axiosRequest(url, "PATCH", {cards:user.cards});
        return data;
    }
    
    catch (error) {
        console.log(error);
        throw error;
    }
}