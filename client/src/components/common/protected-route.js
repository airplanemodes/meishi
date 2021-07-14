import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkIfUserLogged } from '../../services/authentic'

function ProtectedRoute(props) {
    
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const checkTokenUser = async() => {
        let tokendata = await checkIfUserLogged();

        if (!tokendata.status) {
            enqueueSnackbar('You should login first!', {variant: 'warning'});
            localStorage.removeItem("localToken");
            history.push('/login');
        }
    }

    return (
        <Route exact path={props.path} render={() => {
            checkTokenUser();
            return (<props.comp/>);
        }}/>
    );
};

export default ProtectedRoute;