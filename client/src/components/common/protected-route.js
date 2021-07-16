import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { axiosRequest, serverAddress } from '../../services/api';

function ProtectedRoute(props) {
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const protectedValidOne = async() => {
        // Dot notation
        if (!localStorage.localToken) {
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


    const protectedValidTwo = async() => {
        let checkdata = await protectedValidOne();
        if (!checkdata.status) {
            enqueueSnackbar('You should login first!', {variant: 'warning'});
            localStorage.removeItem("localToken");
            history.push('/login');
        }
    };


    return (
        <Route exact path={props.path} render={() => {
            protectedValidTwo();
            return (<props.comp/>);
        }}/>
    );
};

export default ProtectedRoute;