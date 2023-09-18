
import './SampleSiteComponent.css';


export default function SampleSiteComponent(){


    function closeWindow(){
        
        document.getElementById('sample-site-component-container').remove();
    }   
    
    return <div id='sample-site-component-container' className='sample-site-component-container'>
                <div className='sample-site-component-message-container'>
                    <p className='sample-site-component-message'>
                        Advertencia. Éste es un sitio de prueba, al día de la fecha no se puede garantizar la seguridad de sus datos. Al dar click en aceptar da por hecho que está al tanto y actuará acorde a eso.
                    </p>
                    <button className='close-message-button' onClick={closeWindow}>Aceptar</button>
                </div>
            </div>
}