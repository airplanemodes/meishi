import React, { useEffect, useState } from 'react';
import { axiosRequest, serverAddress } from '../services/api';
import PageHeader from './common/page-header';

function Profile(props) {

    // object inside (findOne method returns an object)
    let [userinfo, setUserinfo] = useState({});

    useEffect(() => {
        infoGetAndSet();
    }, []); /* a blank array means that hook will invoke the callback only once
               like a 'componentDidMount' */

    const infoGetAndSet = async() => {
        let url = serverAddress+"/users/info/";

        // without a body on GET request
        let data = await axiosRequest(url, "GET");

        // remove unwanted strings
        data.newdate = data.datecreated.substr(0, data.datecreated.indexOf("T"));
        data.cardsliked = data.cards.length;

        // put data into state
        setUserinfo(data);
    }

    return (
        <div className="container ubuntu pt-5 w-75">
            <PageHeader title="User information"/>
            <div><strong>Name:</strong> {userinfo.name}</div>
            <div><strong>E-mail:</strong> {userinfo.email}</div>
            <div><strong>Date created:</strong> {userinfo.newdate}</div>
            <div><strong>Cards liked:</strong> {userinfo.cardsliked}</div>
        </div>
    );
}

export default Profile;