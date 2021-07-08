import React from 'react';
import PageHeader from './common/page-header';

function About(props) {
    return (
        <div className="container ubuntu pt-5 w-75">
            <PageHeader title="About"/>
            <br/>
            <p>Exchange of business cards is an art.</p>
            <p>A business is an idea, a vision, combined with a purposeful work, that realizes in a given environment. It may reflect someones wish to change something, or it can be result of a group reflection.</p>
        </div>
    );
};

export default About;