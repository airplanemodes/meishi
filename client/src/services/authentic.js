import { axiosRequest, serverAddress } from "./api";

export const checkIfUserLogged = async() => {
    if (!localStorage['localToken']) {
        return {error:"There is no token"};
    }

    try {
        let url = serverAddress+"/users/token/";
        let data = await axiosRequest(url, "GET");
        return data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};