
import './Configuration.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import { useContext, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
export default function Account(){

    const [userData, setUserData] = useState();

    const themeContext = useContext(ThemeContext);
    fetch(themeContext.APIURL+'user',{
        method: 'GET',
        headers: { "Content-Type": "application/json", 'Authorization':themeContext.token},
        mode:'cors',
    }).then(data =>{
        return data.json();
    }).then(res =>{
        if(res.ok === true){
            setUserData(res.data);
        }
    })
    return (
        <>
        <NavBar />
        <div className='account-options-container'>
            <SideBar />
            {JSON.stringify(userData)}
            
        </div>
        </>
    );
}