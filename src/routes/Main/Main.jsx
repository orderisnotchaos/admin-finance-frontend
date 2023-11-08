import React from "react";
import { useNavigate } from "react-router-dom";
import seriousBusinessImage from "../../assets/images/serious-business-image.png";
import NavBar from "../../components/NavBar1/NavBar";
import './Main.css';

function Main(){

    const navigate = useNavigate();

    const handleCreateBusinessClick = () =>{
        navigate('/nuevo-negocio');
    }

    const handelViewBusinessesClick = () =>{
        navigate('/proyectos');
    }

    return( 
            <>
                <NavBar />
                <div className="main-div">
                    <section className="create-businesses-section">
                        
                        <div className="buttons-container">
                            <button className="create-business-button" onClick={handleCreateBusinessClick}>Crear nuevo proyecto</button>

                            <button className="view-businesses-button" onClick={handelViewBusinessesClick}>Ver mis proyectos</button>
                        </div>

                    </section>
                    <section className="picture-section">
                        <img src={seriousBusinessImage} alt="serious-business" className="serious-business-image" />
                    </section>

                </div>
            </>
    );
}


export default Main;