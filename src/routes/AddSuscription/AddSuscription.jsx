
import './AddSuscription.css';
import { useContext, useEffect, useRef, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { Payment } from "@mercadopago/sdk-react";
import { useNavigate } from 'react-router-dom';

export default function AddSuscription(){

    const themeContext = useContext(ThemeContext);

    let message = 'No se encontró una suscripción activa pero, no te preocúpes, tus datos no han sido borrados. ';

    const navigate = useNavigate();

    let pId = useRef(null);

    const [refresh,setRefresh] = useState(false);
  

    useEffect(() =>{

        if(pId.current === null){
            fetch(themeContext.APIURL+'user/preferenceId',{
                method:'GET',
                referrerPolicy: "unsafe-url" ,
                headers:{'Content-Type':'application/json'},
                mode:'cors'
            }).then(res =>{
                return res.json();
            }).then(res =>{
                if(res.ok === true){

                    pId.current = (res.data);
                    setRefresh(true);
                }

            }).catch(e =>{
                console.error(e);
            });
        }
    },[themeContext.APIURL,refresh]);
    const initialization = {
        amount: 500,
        preferenceId: pId.current
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

                    themeContext.setSubscriptionState(30);
                    navigate('/cuenta');
                }
              resolve();
            })
            .catch((error) => {
                console.log(error);
              // manejar la respuesta de error al intentar crear el pago
              reject();
            });
        });
       };
    const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
    };

  //  if(themeContext.firstTime === true) message = '¡Bienvenido a tu nueva cuenta!, para poder usar todas las funcionalidades de la aplicación, debes suscribirte...';

    if(themeContext.suscriptionState <= Number.NEGATIVE_INFINITY ){

        if(pId.current !== null){
            return(
                <>
                    <NavBar /> 
                    <SideBar />
                    <div className='change-subscription-container'>
                    <div id='subscription-time-ended'><p className='subscription-time-ended'>{message}</p></div>
                    <div id='you-can-renew-below'><p className='you-can-renew-below'>&nbsp;Podes renovar tu suscripción abajo: </p></div>
                        <Payment initialization={initialization} 
                                        customization = {customization}
                                        onSubmit={onSubmit}
                                        onError={onError} 
                                        />
                    </div>
                </>
            );
        }

        return(
            <>
                <NavBar /> 
                <SideBar />
                <div className='change-subscription-container'>
                <div id='subscription-time-ended'><p className='subscription-time-ended'>{message}</p></div>

                </div>
            </>
        );
    }
}