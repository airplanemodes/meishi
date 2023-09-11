import React, { useEffect, useState } from 'react';
import { getRequest, serverAddress } from '../services/api';
import Cardlist from './cardlist';
import PageHeader from './common/page-header';
import Pagination from './common/pagination';

function Main(props) {

    let [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let page = params.get("page") ? params.get("page") - 1 : 0;
        // console.log(page); // ?page=...
        let url = serverAddress+"/cards?page="+page;
        cardsGetAndSet(url);

    // re-render the component when props.location value changes
    }, [props.location]);
    
    // getting all cards data, opened to all users
    const cardsGetAndSet = async(url) => {
        let data = await getRequest(url);
        // console.log(data);
        setCardsArray(data);
    }

    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Cards"/>
            {/* pagination can be duplicated if needed 
            for example, to place it at the bottom of a page */}
            <Pagination urlOfTotal="/cards/total" linkTo="/?page="/>
            <Cardlist propy={cardsArray}/>
        </div> 
    )
}

export default Main;