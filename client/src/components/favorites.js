import React, { useEffect, useState } from 'react';
import { axiosRequest, serverAddress } from '../services/api';
import Cardlist from './cardlist';
import PageHeader from './common/page-header';
// import Pagination from './common/pagination';

function Favorites(props) {

    let [favs, setFavs] = useState([]); 

    useEffect(() => {
        favGetAndSet();
    },[]);
    
    const favGetAndSet = async() => {
        let url = serverAddress+"/users/favcards/";
        let data = await axiosRequest(url, "GET");
        setFavs(data);
    };

    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="My favorites"/>
            {/* <Pagination/> */}
            <Cardlist propy={favs}/>
        </div> 
    )
};

export default Favorites;