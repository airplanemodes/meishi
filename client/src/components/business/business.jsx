import React from 'react';
import PageHeader from '../common/page-header';

function Business(props) {
    return (
        <div className="container ubuntu pt-4">
            <PageHeader title="Cards you created"/>
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
                    <tr>
                        <td>number</td>
                        <td>test name</td>
                        <td>test desc</td>
                        <td>new york</td>
                        <td>333555</td>
                        <td>
                            <button>edit</button>
                            <button className="ms-2" style={{background: "pink"}}>del</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default Business;