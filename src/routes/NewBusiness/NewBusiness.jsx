import React from "react";

import ThemeContext from "../../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import "./NewBusiness.css";
import validateCUIT from "../../js files/validateCUIT";
import validateBusinessName from "../../js files/validateBusinessName";
import NavBar from "../../components/NavBar1/NavBar";
export default function NewBusiness(){

    const themeContext = React.useContext(ThemeContext);
    const navigate = useNavigate();
    function handleClick(){

        let name=document.querySelector("#new-business-input-1").value;

        let CUIT = document.getElementById("new-business-input-2").value;

            let isValidCUIT = true;
        if(CUIT.length > 1){
            isValidCUIT=validateCUIT(CUIT);
        }
        let businessesNames = themeContext.businesses.map(business =>{ return business.name});

        if(validateBusinessName(name,businessesNames) && isValidCUIT){


            fetch(themeContext.APIURL+'user/newBusiness',{
                method: 'POST',
                referrerPolicy: "unsafe-url" ,
                headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
                mode:'cors',
                body:JSON.stringify({name}),
            }).then(res =>{

                    return res.json();
                    }).then((res)=>{

                        if(res.ok === true){

                            window.localStorage.setItem('businesses',res.data);
                            themeContext.setBusinesses(res.data);
                            navigate('/cuenta');
                        }else{
                            if(res.statusText === 'max-businesses-amount-reached') 
                                return document.getElementById('max-business-size-reached').style.display = 'block';

                            themeContext.setToken(null);
                            navigate('/login');
                        }
                    }).catch((err) =>{
                        console.error(err);
                    });
        }else{
            if(validateCUIT(CUIT)){
                document.getElementById("new-business-name-error").style.display = "block";
            }else{
                document.getElementById("new-business-cuit-error").style.display = "block";
                document.getElementById("new-business-name-error").style.display = "block";
            }
        }

    }

    return(
        < >
            <NavBar />
            <div id="new-business-component" className="new-business-component">
                <div className="new-business-card-container">  
                    <h2 className="new-business-title">Crear negocio</h2>
                    <div className="new-business-input-container">
                        <label className="new-business-label">Nombre del negocio:</label>
                        <input id = "new-business-input-1" className="create-new-business-input"></input>
                        <p id="new-business-name-error" className="new-business-error">ya tienes un negocio con ese nombre</p>
                    </div>
                    <div className="new-business-input-container">
                        <label className="new-business-label">CUIT del negocio (no necesario):</label>
                        <input id = "new-business-input-2" className="create-new-business-input"></input>
                        <p id="new-business-cuit-error" className="new-business-error">CUIT inválido</p>
                    </div>
                    <div className="create-new-business-button-container">

                        <button className="create-new-business-button" onClick={handleClick}>Crear</button>
                    </div>
                </div>
            </div>  
        </>
    );
}