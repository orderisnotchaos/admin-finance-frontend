
import './AddSuscription.css';
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
import NavBar from '../../components/NavBar1/NavBar';
import { Payment } from "@mercadopago/sdk-react";
import { useNavigate } from 'react-router-dom';

export default function AddSuscription(){

    const themeContext = useContext(ThemeContext);

    let message = 'No se encontró una suscripción activa pero, no te preocúpes, tus datos no han sido borrados. ';

    const navigate = useNavigate();

    const [preferenceId, setPreferenceId] = useState(null);
  

    useEffect(() =>{

            fetch(themeContext.APIURL+'user/preferenceId',{
                method:'GET',
                headers:{'Content-Type':'application/json','Authorization':themeContext.token},
                mode:'cors'
            }).then(res =>{
                return res.json();
            }).then(res =>{

                if (res.ok === true) {
                    setPreferenceId(res.data);
                }

            }).catch(e =>{
                console.error(e);
            });
    },[themeContext.APIURL,themeContext.token]);
    const initialization = {
        amount: 500,
        preferenceId: preferenceId
    };

    const customization = {
        paymentMethods: {

            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all',
        }
    };

    const onSubmit = async (
        { selectedPaymentMethod, formData }
       ) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
          fetch(themeContext.APIURL+"user/processPayment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization":themeContext.token
            },
            body: JSON.stringify({selectedPaymentMethod,formData}),
            mode:'cors',
          })
            .then((response) => response.json())
            .then((response) => {
              // recibir el resultado del pago
                if(response.status === 'approved'){ 

                    themeContext.setSuscriptionState(30);
                    navigate('/cuenta');
                }
              resolve();
            })
            .catch((error) => {
                console.error(error);
              // manejar la respuesta de error al intentar crear el pago
              reject();
            });
        });
       };
    const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.error(error);
    };
    if(themeContext.firstTime === true) message = '¡Bienvenido a tu nueva cuenta!, para poder usar todas las funcionalidades de la aplicación, debes suscribirte...';

    if(themeContext.suscriptionState <= 0 ){

        return(
            <>
                <NavBar /> 
                <div className='change-subscription-container'>
                <div id='subscription-time-ended'><p className='subscription-time-ended'>{message}</p></div>
                <div id='you-can-renew-below'><p className='you-can-renew-below'>&nbsp;Podes renovar tu suscripción abajo: </p></div>
                    <div className='subscription-renew-container'>
                        {preferenceId && (<Payment initialization={initialization} 
                                        customization = {customization}
                                        onSubmit={onSubmit}
                                        onError={onError} 
                                        />)}
                    </div>
                </div>
            </>
        );
        }

        return(
            <>
                <NavBar /> 
                <div className='change-subscription-container'>
                <div id='subscription-time-ended'>
                    <p className='subscription-time-ended'>{message}
                    </p>
                </div>
                    {preferenceId && (<Payment initialization={initialization} 
                                    customization = {customization}
                                    onSubmit={onSubmit}
                                    onError={onError} 
                                    />)}
                </div>
            </>
        );
    }