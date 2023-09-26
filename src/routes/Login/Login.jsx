import React, { useEffect } from "react";
import "./Login.css";
import LoginCard from "./components/LoginCard/LoginCard.jsx";
import Bubbles from "./components/Bubbles/Bubbles";
import Divider from "./components/Divider/Divider";
import {GoogleLogin} from "react-google-login";
import { gapi } from "gapi-script";

function Login(){


    const clientId = "660303962900-ggpkbt2uufqsdjb2gi02brikotad2te9.apps.googleusercontent.com";

    useEffect(() =>{
        const start = () =>{
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        
        gapi.load("client:auth2", start);
    });


    const onSuccess = (res) =>{
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("LOGIN FAILED! res: ", res);
    }
    return(
        <React.Fragment>
                <Bubbles />
                <div className="login">

                    <div className="login-content-container">

                        <section className="left-side-login-section">
                            <h2 className="asd"><label className="red-text-label">A</label><label className="white-text-label">DMIN</label> F<label className="white-text-label">INANCE</label></h2>
                            <p className="123"></p>
                        </section>
                        <section className="right-side-login-section">
                            <div className="login-section-container">
                                <LoginCard />

                                <Divider />
                                <GoogleLogin
                                                clientId= {clientId}
                                                onSuccess={onSuccess}
                                                onFailure={onFailure}
                                                cookiePolicy={"single_host_origin"}
                                                buttonText="Ingresá con google"
                                                isSignedIn={true}
                                            />
                            </div>
                        </section>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Login;