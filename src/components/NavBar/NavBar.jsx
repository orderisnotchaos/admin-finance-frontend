import React, { useEffect } from 'react';

import './NavBar.css';

import ThemeContext from '../../contexts/themeContext.js';

import logo from '../../assets/images/logo-final.png';

import hammenu from '../../assets/images/ham-menu.png';

import { useNavigate, Link } from 'react-router-dom';

function NavBar(){

    const themeContext = React.useContext(ThemeContext);

    const navigate = useNavigate();
    const handleLogOut = () => {

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('userName');
        window.localStorage.removeItem('businesses');
        window.localStorage.removeItem('bName');    
        themeContext['setIsLoggedIn'](false);
        themeContext['setUserName'](undefined);
        themeContext['setMail'](undefined);
        themeContext['setDType'](undefined);
        themeContext['setDNumber'](undefined);
        themeContext['setBusinesses'](undefined);
        themeContext['setSuscriptionState'](undefined);
        themeContext['setFirstTime'](undefined);
        themeContext['setBlockService'](undefined);

        navigate('/')
    }

    const handleUserHamMenuClick = () => {

        document.querySelector('.user-options').style.display = 'flex';

    };

    const handleProfileClick = () =>{
        navigate(`/${themeContext.userName}/cuenta`);
    }

    const handleMouseLeave = () => {
            
            document.querySelector('.user-options').style.display = 'none';
    };

    useEffect(()=>{
        if(window.location.href.split('/')[3] === 'cuenta'){
            document.getElementById('nav-bar-link-1').style.color = 'orangered';
            document.getElementById('nav-bar-link-2').style.color = 'black';
            document.getElementById('nav-bar-link-3').style.color = 'black';
        }
    
        if(window.location.href.split('/')[3] === 'negocios'){
            document.getElementById('nav-bar-link-1').style.color = 'black';
            document.getElementById('nav-bar-link-2').style.color = 'orangered';
            document.getElementById('nav-bar-link-3').style.color = 'black';
        }
    
        if(window.location.href.split('/')[3] === 'vista-general'){
            document.getElementById('nav-bar-link-1').style.color = 'black';
            document.getElementById('nav-bar-link-2').style.color = 'black';
            document.getElementById('nav-bar-link-3').style.color = 'orangered';
        }
    },[]);

    return (
            <nav className='navbar'>
                <ul className='navbar-ul'>
                    <li className='navbar-li-1'>
                        <img src={logo} alt='admin-finance-logo' className='admin-finance-logo'/>
                    </li>
                    <li className='navbar-li-2'>
                        <ul className='navbar-options-ul'>
                            <li className='navbar-option'>
                                <Link id='nav-bar-link-1' to={'/cuenta'} className='nav-bar-link'>Inicio</Link>
                            </li>
                            <li className='navbar-option'>
                                <Link id='nav-bar-link-2' to={'/negocios'} className='nav-bar-link'>Proyectos</Link>
                            </li>
                            <li className='navbar-option'>
                                <Link id='nav-bar-link-3' to={'/vista-general'} className='nav-bar-link'>Vista General</Link>
                            </li>
                        </ul>
                    </li>
                    <li className='navbar-li-3'>
                        <div className='ham-menu' onClick={handleUserHamMenuClick}>
                            <img src={hammenu} alt='ham-menu-img' />
                            <div className='user-options'>
                                <label className='user-name-label'>{themeContext.userName}</label>
                                <div className='user-options-buttons-container' onMouseLeave={handleMouseLeave}>
                                    <button className='user-options-button' onClick={handleProfileClick}>Ver mi perfil</button>
                                    <button className='user-options-button' onClick={handleLogOut}>Cerrar sesion</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
    );


}

export default NavBar;