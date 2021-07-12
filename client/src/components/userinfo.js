import React, { useEffect, useState } from 'react';
import { requestMethod, serverAddress } from '../services/api';
import PageHeader from './common/page-header';

function Userinfo(props) {

    let [userinfo, setUserinfo] = useState({}); // object inside (findOne method returns an object)

    useEffect(() => {
        apiRequest();
    }, []); /* a blank array means that hook will invoke the callback only once
               like a 'componentDidMount' */

    const apiRequest = async() => {
        let url = serverAddress+"/users/info/";
        let data = await requestMethod(url, "GET"); // without a body on GET request
        console.log(data);
        data.newdate = data.datecreated.substr(0, data.datecreated.indexOf("T")); // remove unwanted strings
        setUserinfo(data); // put data into state
    }

    return (
        <div className="container ubuntu pt-5 w-75">
            <PageHeader title="User info"/>
            <div>Name: {userinfo.name}</div>
            <div>E-mail: {userinfo.email}</div>
            <div>Date created: {userinfo.newdate}</div>
        </div>
    );
};

export default Userinfo;