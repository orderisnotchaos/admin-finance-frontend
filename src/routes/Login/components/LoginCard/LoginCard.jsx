
import React from 'react';
import ThemeContext from '../../../../contexts/themeContext';
import { Navigate } from 'react-router-dom';
import './LoginCard.css';


export default function LoginCard(){

    const themeContext = React.useContext(ThemeContext);
    const [servOff, setServOff] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleChange = (event) => {

        if(event.target.id === "username-input"){
            
            setUserName(event.target.value);

        }

        console.log(userName);
        if(event.target.id === "password-input"){
            
            setPassword(event.target.value);

        }

        if(event.key === 'Enter'){
            handleSubmit();
        }
    };

    function handleSubmit(){

        if(password !== '' && userName !== ''){

            fetch(themeContext.APIURL,{
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({userName,password}),
                mode:'cors',
            }).then((res) =>{

                return res.json();
            }).then(res => {

                if(res['message'] === `don't loose your token!`){

                    themeContext['setToken'](res['token']);
                    themeContext['setUserName'](res['user'].name);
                    themeContext['setPassword'](password);
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

    if(themeContext['token']) return <Navigate to='/account' replace={true}/>;

    if(servOff === true) return <Navigate to = '/serverOffline' replace={true} />; 
    if(themeContext['errors']){
        if(document.querySelector('.login-errors-p'))
        document.querySelector('.login-errors-p').style.display="block";
    }

    return <div className='login-card-component-div'>
                <h2 className="login-h2">Iniciar Sesión</h2>
                <div className="login-input-div-1">
                    <label className="login-label">nombre de usuario ó mail</label>
                    <input id = "username-input" className="login-input-1" type="text" onChange={handleChange}></input>
                </div>
                <div className="login-input-div-2">
                    <label className="login-label">contraseña</label>
                    <input id="password-input" className="login-input-2" type="password" onChange={handleChange}></input>
                </div>
                <button className="login-button" onClick={handleSubmit}>Iniciar Sesión</button>
            </div>
}