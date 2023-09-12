import React from "react";
import { Link, Navigate } from "react-router-dom";
import ThemeContext from '../../contexts/themeContext.js';
import "./Login.css";


function Login(){

    const themeContext = React.useContext(ThemeContext);
    const [servOff, setServOff] = React.useState(false);

    const handleChange = (event) => {

        if(event.target.name === "username"){
            
            themeContext['setUserName'](event.target.value);

        }

        if(event.target.name === "password"){
            
            themeContext['setPassword'](event.target.value);

        }

        if(event.key === 'Enter'){
            handleSubmit();
        }
    };

    function handleSubmit(){

        let userName = themeContext['userName'] === undefined ? '' : themeContext['userName'];
        let password = themeContext['password'] === undefined ? '': themeContext['password'];


        if(password !== '' && userName !== ''){

            fetch(themeContext.APIURL,{
                method: 'POST',
                referrerPolicy: "unsafe-url" ,
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({userName,password}),
                mode:'cors',
            }).then((res) =>{

                return res.json();
            }).then(res => {

                if(res['message'] === `don't loose your token!`){

                    themeContext['setToken'](res['token']);
                    themeContext['setUserName'](res['user'].name);
                    themeContext['setMail'](res['user'].mail);
                    themeContext['setDType'](res['user'].dType);
                    themeContext['setDNumber'](res['user'].dNumber);
                    themeContext['setBusinesses'](res['businesses']);
                    themeContext['setSuscriptionState'](res['user'].suscriptionState);
                    themeContext['setFirstTime'](res['user'].firstTime);
                    themeContext['setBlockService'](res['user'].firstTime);
                    
                }else{
                    themeContext['setErrors'](res['message']);
                }
            }).catch(e =>{
                
                console.log(e);
                setServOff(true);
            });
        }else{
            themeContext['setErrors']("las credenciales no pueden estár vacías");
            
        }

    }

    if(themeContext['token']) return <Navigate to='/' replace={true}/>;

    if(servOff === true) return <Navigate to = '/serverOffline' replace={true} />; 
    if(themeContext['errors']){
        if(document.querySelector('.login-errors-p'))
        document.querySelector('.login-errors-p').style.display="block";
    }

        return(
            <React.Fragment>
                    <div className="login">
                        <div className="login-box">
                            <div className="userCredentials-title">
                                <p className="login-title">Ingreso</p>
                            </div>
                            <hr className="login-hr"></hr>
                            <div className="login-form-container">

                                    <label htmlFor="username" className="full-space-label-name">Usuario/mail:</label>
                                    <input type="text" name="username"className="centered-input" id="username" onChange={handleChange}></input>
                                    <label htmlFor="password" className="full-space-label-password">Contraseña:</label>
                                    <input type="password" name="password" className="centered-input" id= "password" onChange={handleChange}></input>
                                    <p className="login-errors-p">{themeContext['errors']}</p>
                                    
                            </div>
                           
                            <div className="login-clicks-container">
                                <Link to={'/createUser'} className="create-user-link">¿no tenés cuenta?</Link>
                                <button type="submit" className="login-button" onClick={handleSubmit}> ingresar </button>
                            </div>

                        </div>
                    </div>
            </React.Fragment>
        );
}

export default Login;