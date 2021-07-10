import axios from 'axios';


export const serverAddress = "http://localhost:3500";


/* Axios GET request */
export const getRequest = async(url) => {
    try {
        let resp = await axios.get(url);
        console.log(resp);
        return resp.data;

    } catch (error) {
        console.log(error);
        return error;
    }
};



/* Axios request */
export const requestMethod = async(url, method, data) => {
    try {
        let resp = await axios({
            url:url,
            method:method,
            data:data,
            headers:{
                'content-type':'application/json',
                'x-auth-token':localStorage['localToken']
            }
        })   
        
        return resp.data;

    } catch (error) {
        console.log(error);
        throw error; /* makes it going to 'catch' at onSubForm() and not to 'try'
        if 'return' used instead of 'throw' the onSubForm() will not recognize that comes an error */
    }
};