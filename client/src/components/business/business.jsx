import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosRequest, serverAddress } from '../../services/api';
import PageHeader from '../common/page-header';

function Business(props) {

    let [cards, setCards] = useState([]);

    
    useEffect(() => {
        getUserCreatedCards();
    },[]);


    const getUserCreatedCards = async() => {
        let url = serverAddress+"/cards/usercards/";
        let data = await axiosRequest(url, "GET");
        console.log(data);
        setCards(data);
    };


    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Cards you created"/>
            <Link to="/addcard" className="btn btn-sm">Add new card</Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>edit/del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.bsnName}</td>
                                    <td>{item.bsnDescription}</td>
                                    <td>{item.bsnAddress}</td>
                                    <td>{item.bsnPhone}</td>
                                    <td>
                                        <button>edit</button>
                                        <button className="ms-2" style={{background: "pink"}}>del</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Business;