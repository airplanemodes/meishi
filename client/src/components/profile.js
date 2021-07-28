import React, { useEffect, useState } from 'react';
import { axiosRequest, serverAddress } from '../services/api';
import PageHeader from './common/page-header';

function Profile(props) {

    let [userinfo, setUserinfo] = useState({}); // object inside (findOne method returns an object)

    useEffect(() => {
        infoGetAndSet();
    }, []); /* a blank array means that hook will invoke the callback only once
               like a 'componentDidMount' */

    const infoGetAndSet = async() => {
        let url = serverAddress+"/users/info/";
        let data = await axiosRequest(url, "GET"); // without a body on GET request
        //console.log(data);
        data.newdate = data.datecreated.substr(0, data.datecreated.indexOf("T")); // remove unwanted strings
        setUserinfo(data); // put data into state
    }

    return (
        <div className="container ubuntu pt-5 w-75">
            <PageHeader title="User information"/>
            <div><strong>Name:</strong> {userinfo.name}</div>
            <div><strong>E-mail:</strong> {userinfo.email}</div>
            <div><strong>Date created:</strong> {userinfo.newdate}</div>
        </div>
    );
};

export default Profile;