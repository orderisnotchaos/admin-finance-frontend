
import React from 'react';
import ThemeContext from '../../../../contexts/themeContext';
import { Navigate } from 'react-router-dom';
import './LoginCard.css';


export default function LoginCard(){

    const themeContext = React.useContext(ThemeContext);
    const [servOff, setServOff] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState("");
    const handleChange = (event) => {

        if(event.target.id === "username-input"){
            
            setUserName(event.target.value);

        }

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
                    
                    window.localStorage.setItem('token',res['token']);
                    window.localStorage.setItem('isLoggedIn',true);
                    window.localStorage.setItem('userName',res['user'].name);
                    window.localStorage.setItem('businesses',res['businesses']);
                    themeContext['setToken'](res['token']);
                    themeContext['setIsLoggedIn'](true);
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

            setErrors("las credenciales no pueden estár vacías");

            if(document.querySelector('invalid-credentials-error') !== null){

                document.querySelector('invalid-credentials-error').style.display='block';

            }
        }

    }

    React.useEffect(() =>{});
    if(themeContext['token']) return <Navigate to='/cuenta' replace={true}/>;

    if(servOff === true) return <Navigate to = '/serverOffline' replace={true} />; 
    if(themeContext['errors']){
        if(document.querySelector('.login-errors-p'))
        document.querySelector('.login-errors-p').style.display="block";
    }

    return <div className='login-card-component-div'>
                <h2 className="login-h2">Iniciar Sesión</h2>
                <div className="login-input-div">
                    <label className="login-label">nombre de usuario o mail</label>
                    <input id = "username-input" className="login-input-1" type="text" onChange={handleChange}></input>
                </div>
                <div className="login-input-div">
                    <label className="login-label">contraseña</label>
                    <input id="password-input" className="login-input-2" type="password" onChange={handleChange}></input>
                </div>
                <p className='invalid-credentials-error'>{errors}</p>
                <button className="login-button" onClick={handleSubmit}>Iniciar Sesión</button>
            </div>
}