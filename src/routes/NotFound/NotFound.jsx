import React from 'react';
import imagenFondo from '../../assets/images/404.jpg';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
function NotFound(){
    const navigate = useNavigate();
    return(
        <div className="not-found-container">
            <div className="not-found-button-container">
                <button className='not-found-button' onClick={() => navigate('/')}>volver</button>
            </div>
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={imagenFondo} alt="not found"/>
        </div>
        
    )
}


export default NotFound;