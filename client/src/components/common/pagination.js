import React, { useEffect, useState } from 'react';
import { getRequest, itemsPerPage, serverAddress } from '../../services/api';
import { Link } from 'react-router-dom';

function Pagination(props) {

    let [countPage, setCountPage] = useState(0);

    useEffect(() => {
        getTotalEntries();
    }, []); // eslint-disable-line

    const getTotalEntries = async() => {
        let url = serverAddress+props.urlOfTotal;
        let data = await getRequest(url);
        // console.log(data.count);
        setCountPage(Math.ceil(data.count / itemsPerPage));
    }

    return (
        <div>
            <span>Page:</span>
            {/* mapping without declaring an array */}
            {[...Array(countPage)].map((item, index) => {
                return (
                    <Link key={index} to={props.linkTo + (index + 1)} className="btn btn-sm ms-1">{index + 1}</Link>
                )
            })}
        </div>
    )
}

export default Pagination;