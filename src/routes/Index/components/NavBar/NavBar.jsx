

import './NavBar.css';
import { Link } from 'react-router-dom';
export default function NavBar(){

    return <>
                <header className="index-nav-bar-container">
                    <ul className='index-nav-bar-ul'>
                        <li className='index-nav-bar-li'>

                        </li>
                        <li className='index-nav-bar-li'>

                        </li>
                        <li className='index-nav-bar-li'>
                            <Link to = {'/login'} >login</Link>
                        </li>
                    </ul>

                </header>
            </>
}