import React from 'react';
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
import { initMercadoPago } from "@mercadopago/sdk-react";

function App() {
  const APIURL = 'http://62.72.63.208:8000/';
  const [userName, setUserName] = React.useState('');
  const [mail, setMail] = React.useState(''); 
  const [dType, setDType] = React.useState('');
  const [businesses, setBusinesses] = React.useState([]);
  const [bName, setBName] = React.useState('');
  const [firstTime, setFirstTime] = React.useState(false);
  const [blockService, setBlockService] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState(1141957202);
  const [suscriptionState, setSuscriptionState] = React.useState(1);
  const [dNumber, setDNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState(); 
  const [errors, setErrors] = React.useState();
  const varSetters = {setUserName, setMail, setDType, setDNumber, setPassword, setToken, setErrors, setBName, setBusinesses, setSuscriptionState, setPhoneNumber,setFirstTime, setBlockService};
  const varGetters = {userName, mail, dType, dNumber, password, token, errors, bName, businesses, suscriptionState ,phoneNumber, firstTime, blockService};

  initMercadoPago("TEST-7b993f7f-91f7-435f-9b2f-ee4466404ed4",{locale:'es-AR'});


  if(suscriptionState >Number.NEGATIVE_INFINITY){
  return (
    <div className="App">
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path = '/general-view' element={<GeneralView />} />
            <Route path ='/new-business' element={<NewBusiness />} />
            <Route path = {`/${userName}/${bName}`} element ={<BusinessOverview />} />
            <Route path = {`/${userName}/${bName}/ventas/agregar`} element={<AddSales bName={bName}/>} />
            <Route path = {`/${userName}/${bName}/ventas/historial`} element={<SalesHistory />} />
            <Route path = {`/${userName}/${bName}/detalles`} element={<BusinessDetails business={businesses.find(business => business.name === bName)}/>} />
            <Route path = {`/${userName}/suscripcion`} element = {<AddSuscription />} />
            <Route path= '/login' element= {<Login />} />
            <Route path = '/ayuda' element={<Help />} />
            <Route path= '/createUser' element={<NewUser />} />
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
    <div className='app'>
      <ThemeContext.Provider value= {{...varSetters,  ...varGetters, APIURL}}>
        <BrowserRouter>
          <Routes>
            <Route path = {'/'} element={<AddSuscription />} />
            <Route path= '/login' element= {<Login />} />
            <Route path={`${userName}/cuenta`} element={<Account />} />
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
