

import ThemeContext from '../../../../contexts/themeContext';
import React from 'react';
import Suscription from '../Suscription/Suscription';
import './SuscriptionState.css';

export default function SuscriptionState(){

    const themeContext = React.useContext(ThemeContext);

    return (
        <>
            
            <div className='suscription-state-container'>
                <h1 className='suscription-title'>Suscripción</h1>
                <div className='suscription-state-info-container'>
                    <p className='suscription-state-paragraph'>estado:</p>
                    <Suscription sub = {themeContext['suscriptionState']} userName = {themeContext['userName']}/>
                </div>
            </div>
        </>
    );
}