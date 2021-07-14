import { axiosRequest, serverAddress } from './api';
import { checkIfUserLogged } from './authentic';

var user = {};

export const checkUser = async() => {
    if (localStorage['localToken']) {
      let userdata = await checkIfUserLogged();
      if (!userdata.status) {
        localStorage.removeItem("localToken");
        window.location.href = "/login";
      } else {
        getUserDataFromServer();
      }
    }
  };


  
export const getUserDataFromServer = async() => {
    try {
        let url = serverAddress+"/users/info/";
        let data = await axiosRequest(url, "GET");
        user = data;
        
    } catch (error) {
        user = {};

    }
};



export const returnUserData = () => {
    return user;
};