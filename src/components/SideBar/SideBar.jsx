import React, { useContext } from "react";
import './SideBar.css';
import { Link } from "react-router-dom";
import ThemeContext from "../../contexts/themeContext";

function SideBar(){

    const themeContext = useContext(ThemeContext);

    if(themeContext.subscriptionState === 0 || themeContext.blockService === true) {

        return (
            <React.Fragment>
                <div className="sidebar">

                    <hr className="sidebar-separator"></hr>
                    <Link to = "/" className="link" id="businesses">Inicio</Link>
                    <hr className="sidebar-separator"></hr>
                    <Link to = "/" className="link" id="new-business">Nuevo Negocio</Link>
                    <hr className="sidebar-separator"></hr>
                    <Link to = "/" className="link" id="general-view">Vista General</Link>
                    <hr className="sidebar-separator"></hr>
                </div>    
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className="sidebar">

                <hr className="sidebar-separator"></hr>
                <Link to = "/" className="link" id="businesses">Inicio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = "/new-business" className="link" id="new-business">Nuevo Negocio</Link>
                <hr className="sidebar-separator"></hr>
                <Link to = "/general-view" className="link" id="general-view">Vista General</Link>
                <hr className="sidebar-separator"></hr>
            </div>    
        </React.Fragment>
    );
}

export default SideBar;