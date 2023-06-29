import React from 'react';

import './NavBar.css';

import ThemeContext from '../../contexts/themeContext.js';

import {Link} from 'react-router-dom';
import foto from '../../assets/images/ham-menu.png';

import logo from '../../assets/images/logo-final.png';
function NavBar(){

    const themeContext = React.useContext(ThemeContext);

    const handleLogOut = () => {
        themeContext['setToken'](undefined);
        themeContext['setUserName'](undefined);
        themeContext['setMail'](undefined);
        themeContext['setDType'](undefined);
        themeContext['setDNumber'](undefined);
        themeContext['setBusinesses'](undefined);
        themeContext['setSuscriptionState'](undefined);
        themeContext['setFirstTime'](undefined);
        themeContext['setBlockService'](undefined);
    }

    const handleUserHamMenuClick = () => {

        document.querySelector('.user-options').style.display = 'flex';

    };

    const handleMouseLeave = () => {
            
            document.querySelector('.user-options').style.display = 'none';
    };
    return (
        <React.Fragment>
            <nav className='navbar'>

                <ul className='navbar-nav'>
                    <li className='logo-container'>
                        <Link to='/' className='navBar-logo-link'>
                            <img className='logo' src={logo} alt='admin finance'></img>
                            <p className='logo-text'>admin finance</p>
                        </Link>
                    </li>
                    <li className='separator'>

                    </li>
                    <li className='right-content'>
                        <div className='user-ham-menu' onClick={handleUserHamMenuClick} onMouseLeave={handleMouseLeave}> 
                            <div className='img-profile-container'>
                                <img className = 'img-profile' src={foto} id={2} alt = {`${themeContext['userName']}'s avatar`} />
                            </div>
                            <ul  className = 'user-options'>

                                <li className='user-options-li'>
                                    <Link to={`/${themeContext['userName']}/cuenta`} className='ham-menu-link'>
                                        cuenta
                                    </Link>
                                </li>



                                <li className='user-options-li'>
                                    <Link to='/configuration' className='ham-menu-link'>
                                        configuración
                                    </Link>
                                </li>

                                <li className='user-options-li'>
                                    <Link to={`/ayuda`} className='ham-menu-link'>
                                        ayuda
                                    </Link>
                                </li>

                                <li className='user-options-last-li' onClick={handleLogOut}>
                                    <Link to={`/login`} className='ham-menu-link'>
                                        cerrar sesión
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </nav>
        </React.Fragment>
    );


}

export default NavBar;