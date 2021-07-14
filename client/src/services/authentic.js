import { axiosRequest, serverAddress } from "./api";



export const checkIfUserLogged = async() => {
    if (!localStorage['localToken']) {
        return {error:"There is no token"};
    }

    try {
        let url = serverAddress+"/users/token/";
        let logindata = await axiosRequest(url, "GET");
        return logindata;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};