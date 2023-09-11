import axios from 'axios';

/* change the server address here if needed */
export const serverAddress = "http://localhost:3500";

/* change the number of items displayed per page if needed */
export const itemsPerPage = 6;


/* Axios GET without a token */
export const getRequest = async(url) => {
    try {
        let resp = await axios.get(url);
        // console.log(resp);
        return resp.data;
    }
    
    catch (error) {
        console.log(error);
        return error;
    }
}


/* Axios detailed request */
export const axiosRequest = async(url, method, data) => {
    try {
        let resp = await axios({
            url: url,
            method: method,
            data: data,
            headers: {
                'content-type':'application/json',

                // gets token from the browser
                'x-auth-token':localStorage['localToken']
            }
        })   
        
        return resp.data;
    }
    
    catch (error) {
        console.log(error);
        
        throw error; /* makes it going to 'catch' at onSubForm() and not to 'try'
        if 'return' used instead of 'throw' the onSubForm() will not recognize that comes an error */
    }
}