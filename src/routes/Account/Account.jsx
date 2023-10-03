
import './Account.css';
import NavBar from '../../components/NavBar/NavBar.jsx';
import DetailsCard from './components/DetailsCard/DetailsCard.jsx';
import { useContext } from 'react';
import ThemeContext from '../../contexts/themeContext';
import SubscriptionState from './components/SuscriptionState/SuscriptionState';
export default function Account(){
  
    const accountFields = ['userName','mail','password','document','businesses','phone'];
    const themeContext = useContext(ThemeContext);
    return (
        <>
            <NavBar />
            <div id='account-component' className='account-container'>

                <div className='account-details-container'>
                    <h1 className='account-title'>Detalles</h1>
                    <DetailsCard data = {accountFields.map(field =>{

                        if(field === 'document')return [themeContext['dType'],themeContext['dNumber']];
                        if(field === 'businesses') return themeContext.businesses.length;
                        if(field === 'phone') return themeContext['phoneNumber'];
                        return themeContext[field];
                    })}/>
                </div>

                <SubscriptionState />

            </div>
        </>
    );
}