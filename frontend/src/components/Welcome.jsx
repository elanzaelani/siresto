import React from 'react';
import { useSelector } from 'react-redux';

const Welcome = () => {
    const {user}=useSelector((state)=>state.auth);

    return (
        <div>
            <h1 className="title">dashboaed</h1>
            <h2 className="subtitle">Welcomeback   <strong>{user && user.name}</strong></h2>
        </div>
    )
}

export default Welcome
