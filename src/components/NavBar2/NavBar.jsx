

import './NavBar.css';
import { Link } from 'react-router-dom';
import image from '../../assets/images/logo-final.png';
export default function NavBar(props){

    return <>
                <header className="index-nav-bar-container">
                    <ul className='index-nav-bar-ul'>
                        <li className='index-nav-bar-logo-li'>
                            <Link to={'/'}  className='nav-bar-image-link'>
                            <img src={image} className="logo"alt='logo'/>
                            </Link>
                        </li>
                        <li className='index-nav-bar-options-li'>
                            {
                            <ul className='navbar-options-ul'>
                                <li className='navbar-options-li'>
                                    <Link to={'/sobre-nosotros'} className='navbar-options-link'>Sobre Nosotros</Link>
                                </li>
                                <li className='navbar-options-li'>
                                    <Link to={'/preguntas'} className='navbar-options-link'>Preguntas</Link>
                                </li>
                                <li className='navbar-options-li'>
                                    <Link to={'/servicio'} className='navbar-options-link'>El servicio</Link>
                                </li>
                                <li className='navbar-options-li'>
                                    <Link to={'/contacto'} className='navbar-options-link'>Contacto</Link>
                                </li>
                            </ul>
                            }
                        </li>
                        <li className='index-nav-bar-li'>
                            {props.isLoggedIn ?
                            <>
                                <Link to={'/cuenta'} className='register-link'>Cuenta</Link>
                            </>
                            :
                            <>
                                <Link to = {'/login'} className='login-link'>Iniciar Sesion</Link>
                                <Link to = {'/crear-cuenta'} className='register-link'>Registrarme</Link>
                            </>
                            }
                        </li>
                    </ul>

                </header>
            </>
}