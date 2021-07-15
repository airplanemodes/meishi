import { axiosRequest, serverAddress } from './api';

var user = {};

export const updateUserData = async() => {
    // is there a token?
    if (localStorage['localToken']) {
      try {
        // is the token valid?
        let url = serverAddress+"/users/info/";
        let data = await axiosRequest(url, "GET");

        if (data._id) {
          // success, assign the data
          user = data;
        } else {
          // token invalid or expired, remove it
          localStorage.removeItem('localToken');
          user = {};
        }
        return user;

      } catch (error) {
        localStorage.removeItem('localToken');
        user = {};
        return user;
      }
    } else {
      // there is no token at all
      user = {};
      return user;
    }
  };



export const returnUserData = () => {
    return user;
};