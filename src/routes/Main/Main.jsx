import React from "react";
import { useNavigate } from "react-router-dom";

import './Main.css';
import NavBar from "../../components/NavBar/NavBar";
import MaxBusinessReached from "../../components/MaxBusinessReached/MaxBusinessReached";
import SideBar from "../../components/SideBar/SideBar";
import ThemeContext from "../../contexts/themeContext";
import Business from "../../components/Business/Business";
import NewBusinessServerError from "../../components/ServiceUnavailable/ServiceUnavailable.jsx";
import WelcomeComponent from "../../components/WelcomeComponent/WelcomeComponent";

function Main(){

    const themeContext = React.useContext(ThemeContext);
    const navigate = useNavigate();
    React.useEffect(()=>{

        if(!themeContext.token || !themeContext.businesses) navigate('/login');

        if(themeContext.subscriptionState === 0) navigate('/');
        
    },[themeContext,navigate]);

    if(themeContext.firstTime === true){
        return(
            <React.Fragment>
                <NavBar />
                <SideBar />
                <div className='main-content'>
                    <div id="first-time-content-wrapper" className="first-time-content-wrapper">
                        <h1 className="welcome-title">¡Bienvenido/a {themeContext.userName}!</h1>
                        <h3 className="welcome-subtitle">&#60;-- ¡Haz click aquí para crear un negocio!</h3>
                    </div>
                </div>
                <WelcomeComponent />
            </React.Fragment>
        );
    }
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <div className='main-content'>

                    <div id="content-wrapper" className="content-wrapper">
                        <div id="businesses-component" className="businesses-container"> 
                            {themeContext.businesses.length !== 0 ?themeContext.businesses.map((business, i)=>{

                                return (<Business {...business} businessesLength={themeContext.businesses.length} key= {i}/>);
                            }):
                                    <div className="no-businesses-added-content-wrapper">
                                        <h1 className="welcome-title">¡Bienvenido/a {themeContext.userName}!</h1>
                                        <h3 className="welcome-subtitle">&#60;-- ¡Haz click aquí para crear un negocio!</h3>
                                    </div>}
                        </div>
                        <NewBusinessServerError />
                        <MaxBusinessReached></MaxBusinessReached>
                    </div>
                </div>
            </React.Fragment>
        ); 
}


export default Main;