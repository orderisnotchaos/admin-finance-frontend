import React from "react";
import "./Login.css";
import LoginCard from "./components/LoginCard/LoginCard.jsx";
import Bubbles from "./components/Bubbles/Bubbles";
import { gapi } from "gapi-script";
function Login(){

    const clientId = "660303962900-ggpkbt2uufqsdjb2gi02brikotad2te9.apps.googleusercontent.com";

    React.useEffect(() =>{
        const start = () =>{
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        
        gapi.load("client:auth2", start);
    });

/*
    const onSuccess = (res) =>{
  
            fetch(themeContext.APIURL,{
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({userName:res.profileObj.email,token:res.accesToken}),
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
                    themeContext['setPassword'](res.profileObj.googleId);
                    themeContext['setMail'](res['user'].mail);
                    themeContext['setDType'](res['user'].dType);
                    themeContext['setDNumber'](res['user'].dNumber);
                    themeContext['setBusinesses'](res['businesses']);
                    themeContext['setSuscriptionState'](res['user'].suscriptionState);
                    themeContext['setFirstTime'](res['user'].firstTime);
                    themeContext['setBlockService'](res['user'].firstTime);
                    
                }
            }).catch(e =>{
                
                console.log(e);
                setServOff(true);
            });

        console.log("LOGIN SUCCESS! Current user: ", res);

    }
    */
    /*
    const onFailure = (res) =>{
        console.log("LOGIN FAILED! res: ", res);
    }
*/ 
    return(
        <React.Fragment>
                <Bubbles />
                <div className="login">

                    <div className="login-content-container">

                        <section className="left-side-login-section">
                            <h2 className="admin-finance-title"><label className="red-text-label">A</label><label className="white-text-label">DMIN</label> F<label className="white-text-label">INANCE</label></h2>
                        </section>
                        <section className="right-side-login-section">
                            <div className="login-section-container">
                                <LoginCard />
{/*
                                <Divider />
                                <GoogleLogin
                                                clientId= {clientId}
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                                cookiePolicy={"single_host_origin"}
                                                buttonText="Ingresá con google"
                                                isSignedIn={true}
                                            />
    */}
                            </div>
                        </section>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Login;