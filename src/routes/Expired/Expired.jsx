import React from 'react';

import './Expired.css';
import { Link } from 'react-router-dom';


export default function Expired(){

    return (
            <div className='centered'>
                <div className='exp-content'>
                    <h1 className='exp-session'>YOUR SESSION HAS EXPIRED!</h1>
                    <Link to={'/login'} className='login-link' >
                        Click here to login!
                    </Link>
                </div>
            </div>
    );
}