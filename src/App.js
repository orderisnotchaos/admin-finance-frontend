import React, { useEffect } from 'react';
import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import ThemeContext from './contexts/themeContext.js';
import Main from './routes/Main/Main.jsx';
import Login from './routes/Login/Login.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import ServerOffline from './routes/ServerOffline/ServerOffline.jsx';
import NewUser from './routes/NewUser/NewUser.jsx';
import Account from './routes/Account/Account.jsx';
import GeneralView from './routes/GeneralView/GeneralView.jsx';
import AccountConfiguration from './routes/Configuration/Configuration.jsx';
import NewBusiness from './routes/NewBusiness/NewBusiness';
import BusinessOverview from './routes/BusinessOverview/BusinessOverview';
import AddSuscription from './routes/AddSuscription/AddSuscription';
import AddSales from './routes/AddSales/AddSales';
import TermsAndConditions from './routes/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './routes/PrivacyPolicy/PrivacyPolicy';
import Help from './routes/Help/Help';
import SalesHistory from './routes/SalesHistory/SalesHistory';
import BusinessDetails from './routes/BusinessDetails/BusinessDetails';
import Index from './routes/Index/Index';
import { initMercadoPago } from "@mercadopago/sdk-react";
import Projects from './routes/Projects/Projects';
import AboutUs from './routes/AboutUs/AboutUs';
import FAQ from './routes/FAQ/FAQ';
import Service from './routes/Service/Service';
import Contact from './routes/Contact/Contact';

function App() {

  const APIURL = 'http://127.0.0.1:8000/';
  const [userName, setUserName] = React.useState(window.localStorage.getItem('userName'));
  const [mail, setMail] = React.useState(''); 
  const [dType, setDType] = React.useState('');
  const [businesses, setBusinesses] = React.useState([]);
  const [bName, setBName] = React.useState(window.localStorage.getItem('bName'));
  const [firstTime, setFirstTime] = React.useState(false);
  const [blockService, setBlockService] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState(1141957202);
  const [suscriptionState, setSuscriptionState] = React.useState(1);
  const [dNumber, setDNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [token, setToken] = React.useState(window.localStorage.getItem('token')); 
  const [isLoggedIn, setIsLoggedIn] = React.useState(window.localStorage.getItem('isLoggedIn'));
  const [errors, setErrors] = React.useState();
  const varSetters = {setUserName, setMail, setDType, setDNumber, setIsLoggedIn, setPassword, setToken, setErrors, setBName, setBusinesses, setSuscriptionState, setPhoneNumber,setFirstTime, setBlockService};
  const varGetters = {userName, mail, dType, dNumber, password, token, errors, isLoggedIn, bName, businesses, suscriptionState ,phoneNumber, firstTime, blockService};

  initMercadoPago("TEST-7b993f7f-91f7-435f-9b2f-ee4466404ed4",{locale:'es-AR'});

  if(!isLoggedIn && token !== null){
    window.localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
  }
  useEffect(()=>{

  if(window.localStorage.getItem('token') !== null && window.localStorage.getItem('token') !== undefined && shouldFetch === true){
    setToken(window.localStorage.getItem('token'));
    fetch(APIURL+'user/pageReload',{
      method:'GET',
      headers:{'Content-Type':'application/json','Authorization':window.localStorage.getItem('token')},
      mode:'cors'
    }).then(res=> res.json())
      .then(res => {
        if(res.ok){
          setUserName(res.dataValues.name);
          setDNumber(res.dataValues.dNumber);
          setDType(res.dataValues.dType);
          setMail(res.dataValues.mail);
          setBusinesses(res.businesses);
          setPassword(res.dataValues.password);
          setShouldFetch(false);
        }
      });
     }
    }, [businesses,shouldFetch]);



  if(suscriptionState >Number.NEGATIVE_INFINITY && window.localStorage.getItem('token') !== null){
  return (
    <div className="App">

      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
          <BrowserRouter>
            <Routes>
              <Route exact path = '/' element = {<Index/>}/>
              <Route exact path='/cuenta' element={<Main />} />
              <Route exact path='/sobre-nosotros' element={<AboutUs />} />
              <Route exact path = '/preguntas' element={<FAQ />} />
              <Route path = '/proyectos' element={<Projects />} />
              <Route path = '/vista-general' element={<GeneralView />} />
              <Route path ='/nuevo-negocio' element={<NewBusiness />} />
              <Route path = {`/${userName}/${bName}`} element ={<BusinessOverview />} />
              <Route path = {`/${userName}/${bName}/ventas/agregar`} element={<AddSales bName={bName}/>} />
              <Route path = {`/${userName}/${bName}/ventas/historial`} element={<SalesHistory />} />
              <Route path = {`/${userName}/${bName}/detalles`} element={<BusinessDetails business={ businesses ? businesses.find(business => business.name === bName): window.location.reload()}/>} />
              <Route path = {`/${userName}/suscripcion`} element = {<AddSuscription />} />
              {isLoggedIn ? <></>:<Route path= '/login' element= {<Login />} />}
              <Route path = '/ayuda' element={<Help />} />
              <Route path= '/crear-cuenta' element={<NewUser />} />
              <Route path = '/terminos-y-condiciones' element={<TermsAndConditions />} />
              <Route path = '/politica-de-privacidad' element = {<PrivacyPolicy/>} />
              <Route path='/serverOffline' element={<ServerOffline />} />
              <Route path='/configuration' element={<AccountConfiguration />} />
              <Route path={`${userName}/cuenta`} element={<Account />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
  }

  return(
    <div className='App'>
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route path = {'/'} element={<Index />} />
            <Route path= '/login' element= {<Login />} />
            <Route exact path='/cuenta' element={<AddSuscription />} />
            <Route exact path='/sobre-nosotros' element={<AboutUs />} />
            <Route exact path = '/preguntas' element={<FAQ />} />
            <Route exact path = '/servicio' element={<Service />} />
            <Route exact path='/contacto' element={<Contact />} />
            <Route path={`${userName}/cuenta`} element={<Account />} />
            <Route path= '/crear-cuenta' element={<NewUser />} />
            <Route path = '/terminos-y-condiciones' element={<TermsAndConditions />} />
            <Route path = '/politica-de-privacidad' element = {<PrivacyPolicy/>} />
            <Route path='*' element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
