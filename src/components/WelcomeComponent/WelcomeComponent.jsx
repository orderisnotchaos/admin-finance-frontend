
import { useContext } from "react";
import ThemeContext from "../../contexts/themeContext";
import { Link } from 'react-router-dom';
import "./WelcomeComponent.css";
export default function WelcomeComponent(){
    
    const themeContext = useContext(ThemeContext);


    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    let handleAcceptedTerms = ()=>{
        fetch(themeContext.APIURL + 'user/acceptedTerms',{
            method: 'POST',
            headers: { "Content-Type": "application/json", "Authorization":themeContext.token},
            body: JSON.stringify({userName:themeContext.userName}),
            mode:'cors',
        }).then((res) =>{
            return res.json();
        }).then(res => {
            if(res.ok === true){ 

                themeContext.setFirstTime(false);
                themeContext.setBlockService(false);
            }
        });
    };

    let handleRejectedTerms = () =>{
        themeContext.setBlockService(true);
        document.getElementById('accept-terms-container').style.animation = 'disappear 1s normal forwards';
        document.getElementById('accept-terms-box').style.animation = 'slideout 1s normal forwards';
        timeout(1000).then(() => {
            document.getElementById('accept-terms-container').style.display = 'none';
        }); 
    };

    return(
        <>
            <div id = "accept-terms-container" className="accept-terms-container">
                <div id = "accept-terms-box" className="accept-terms-box">
                    <h1>Términos y Condiciones</h1>
                    <p>Al dar click en el botón Aceptar das a entender que has leído y aceptas los <Link to ={'/terminos-y-condiciones'} target="_blank" >Términos y condiciones</Link> del servicio</p>
                    <button className="accept-terms-button" onClick={handleAcceptedTerms}>Aceptar</button>
                    <button className="reject-terms-button" onClick={handleRejectedTerms}>Rechazar</button>
                </div>
            </div>
        </>
     );
}