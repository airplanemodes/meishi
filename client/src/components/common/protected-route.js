import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { checkIfUserLogged } from '../../services/authentic'

function ProtectedRoute(props) {
    
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Route exact path={props.path} render={() => {
            checkIfUserLogged()
            .then(data => {
                console.log(data);
                if (!data.status) {
                    enqueueSnackbar('You should login first!', {variant: 'warning'});
                    localStorage.removeItem("localToken");
                    history.push('/login');
                }
            })
            return (<props.comp/>)
        }}/>
    );
};

export default ProtectedRoute;