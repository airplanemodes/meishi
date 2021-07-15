import React, { useEffect, useState } from 'react';
import { getRequest, serverAddress } from '../services/api';
import Cardlist from './cardlist';
import PageHeader from './common/page-header';

function Main(props) {

    let [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
        cardsGetAndSet();
    },[]);
    
    const cardsGetAndSet = async() => {
        let url = serverAddress+"/cards/";
        let data = await getRequest(url);
        //console.log(data);
        setCardsArray(data);
    };

    return (
        <main className="container ubuntu pt-4">
            <PageHeader title="Cards"/>
            <Cardlist prop={cardsArray}/>
        </main> 
    );
};

export default Main;