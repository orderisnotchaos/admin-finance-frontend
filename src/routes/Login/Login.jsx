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

    return(
        <>         
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
        </>
    );
}

export default Login;