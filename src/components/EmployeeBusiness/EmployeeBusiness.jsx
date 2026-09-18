import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import './EmployeeBusiness.css'
import { useContext } from 'react';
import ThemeContext from '../../contexts/themeContext';

export default function EmployeeBusiness(props){

    const themeContext = useContext(ThemeContext);
    useEffect(() => {
        themeContext.setEmployeeBusiness(props.employeeBusiness.name);
        window.localStorage.setItem(
            'employeeBusiness',
            props.employeeBusiness.name
        );  
    }, [themeContext,props.employeeBusiness.name]);
    return(
            <>
            <Link to = {`/${props.employeeBusiness.name}/${themeContext.userName}/ventas`} className='employee-business-container'>
                <p className='employee-business-business-name'>{props.employeeBusiness.name}</p>
            </Link>
            </>
    )
}