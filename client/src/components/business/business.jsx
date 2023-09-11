import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { axiosRequest, serverAddress } from '../../services/api';
import { useSnackbar } from 'notistack';
import PageHeader from '../common/page-header';

function Business(props) {

    let [cards, setCards] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    let history = useHistory();
    
    useEffect(() => {
        getUserCreatedCards();
    }, [props.location]);

    const getUserCreatedCards = async() => {
        let url = serverAddress+"/cards/usercards/";
        let data = await axiosRequest(url, "GET");
        // console.log(data);
        // from newer to older
        data.reverse();
        setCards(data);
    }

    const editButton = async(idprop) => {
        history.push("/editcard/"+idprop);
    }

    const deleteButton = async(idprop) => {
        if (window.confirm("Are you sure?")) {
            let url = serverAddress+"/cards/"+idprop;
            let data = await axiosRequest(url, "DELETE");
            if (data.n === 1) {
                getUserCreatedCards();
                enqueueSnackbar('Card deleted successfully!', {variant: 'info'});
            }
        }
    }

    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Cards you created"/>
            <br />
            <Link to="/addcard" className="btn btn-sm mb-2">Add new card</Link>
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
                                <tr key={item._id}>
                                    <td>{index+1}</td>
                                    <td>{item.bsnName}</td>
                                    <td>{item.bsnDescription}</td>
                                    <td>{item.bsnAddress}</td>
                                    <td>{item.bsnPhone}</td>
                                    <td>
                                        <button onClick={() => {
                                            editButton(item._id);
                                        }}>edit</button>
                                        <button className="ms-2" style={{background: "pink"}} onClick={() => {
                                            deleteButton(item._id);
                                        }}>del</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Business;