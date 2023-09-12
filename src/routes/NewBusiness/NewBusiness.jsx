import React from "react";

import ThemeContext from "../../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import "./NewBusiness.css";
import validateCUIT from "../../js files/validateCUIT";
import validateBusinessName from "../../js files/validateBusinessName";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
export default function NewBusiness(){

    const themeContext = React.useContext(ThemeContext);
    const navigate = useNavigate();
    function handleClick(){

        let name=document.querySelector("#new-business-input-1").value;

        let CUIT = document.getElementById("new-business-input-2").value;

        let businessesNames = themeContext.businesses.map(business =>{ return business.name});

        if(validateBusinessName(name,businessesNames)){


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

                            themeContext.setBusinesses(res.data);
                            navigate('/');
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
            <SideBar />
            <div id="new-business-component" className="new-business-wrapper">  

                <div className="new-business-form-container">
                    <h3 className="new-business-h3">
                        Nuevo negocio
                    </h3>
                    <div id="new-business-input-data-div" className="new-business-input-data-div">
                        <ul className="new-business-data-ul">

                            <li className="new-business-flex-li">
                                <label className="new-business-label"> nombre: </label>
                                <input id="new-business-input-1" className="new-business-input" ></input>
                                <p id ="new-business-name-error" className="new-business-error">debe ingresar un nombre y este debe ser único</p>
                            </li>

                            
                            <li className="new-business-flex-li">
                                <label className="new-business-label"> CUIT: </label>
                                <input id="new-business-input-2" className="new-business-input" ></input>
                                <p id="new-business-cuit-error" className="new-business-error"> debe ingresar un CUIT válido</p>
                            </li>
                        </ul>
                        <p id="max-business-size-reached" className="new-business-error">no puede agregar más negocios</p>
                    </div>
                    <div className="new-business-submit-button-container">
                        <button onClick={handleClick} className="new-business-submit-button"><label className="submit-button-label">crear</label></button>
                    </div>
                </div>
            </div>
        </>
    );
}