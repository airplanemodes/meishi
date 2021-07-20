import React, { useEffect, useState } from 'react';
import { getRequest, serverAddress } from '../services/api';
import Cardlist from './cardlist';
import PageHeader from './common/page-header';

function Main(props) {

    let [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
        cardsGetAndSet();
    },[]);
    
    // Getting all cards data, opened to all users
    const cardsGetAndSet = async() => {
        let url = serverAddress+"/cards/";
        let data = await getRequest(url);
        //console.log(data);
        setCardsArray(data);
    };

    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Cards"/>
            <Cardlist propy={cardsArray}/>
        </div> 
    )
};

export default Main;