

import Businesses from '../../components/Businesses/Businesses';
import NavBar from '../../components/NavBar/NavBar.jsx';
import ThemeContext from '../../contexts/themeContext';
import { useContext } from 'react';
import './Projects.css';


export default function Projects(){

    const themeContext = useContext(ThemeContext);

    const businesses = themeContext.businesses;

    return (<>
                <NavBar/>
                <div className='businesses-container'>
                    <Businesses businesses={businesses} />
                </div>
            </>);

}