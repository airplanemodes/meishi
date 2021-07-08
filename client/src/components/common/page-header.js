import React from 'react';

// one component for all h1's

function PageHeader(props) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div> 
    );
};

export default PageHeader;