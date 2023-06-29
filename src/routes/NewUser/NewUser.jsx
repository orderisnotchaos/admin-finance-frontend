import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import validateMail from '../../js files/validateMail';
import validateDocNumber from '../../js files/validateDocument';
import './NewUser.css';
export default function NewUser() {

    const themeContext = useContext(ThemeContext);

    const [userCreationSucces, setUserCreationSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmitReq = () => {
        let userData = {
            uName: '',
            uMail: '',
            uDType: 'DNI',
            uDocNumber: 0,
            uPassword: ''
        }
        let userValues = ['uName', 'uMail', 'uDType', 'uDocNumber', 'uPassword'];
        for (let i = 0; i < 5; i++) {
            let data = document.getElementById(userValues[i]);
            switch (userValues[i]) {
                case 'uMail':
                    if (!validateMail(data.value)) {
                        document.getElementById('new-user-invalid-mail-message').style.display = 'block';
                    }else{
                        document.getElementById('new-user-invalid-mail-message').style.display = 'none';
                    }
                    break;
                case 'uDocNumber':

                console.log(data.value);
                console.log(validateDocNumber(data.value));
                    if (!validateDocNumber(data.value)) {
                        
                        document.getElementById('new-user-invalid-document-message').style.display = 'block';
                    }else{
                        document.getElementById('new-user-invalid-document-message').style.display = 'none';
                    }
                    break;
                default:
                    break;
            }
            if (userValues[i] === 'uDType') {

            } else {
                if (data.value !== '' && data.value !== null && data.value !== undefined) {
                    userData[userValues[i]] = data.value;
                }
            }
        }
        fetch(themeContext.APIURL + 'newUser', {

            method: 'POST',
            headers: { "Content-Type": "application/json" },
            mode: 'cors',
            body: JSON.stringify({ ...userData })
        }).then(res => {

            if (res.ok === true) {

                setUserCreationSuccess(true);
                themeContext.setFirstTime(true);
            } else {
                document.getElementById('new-user-error-message').style.display = 'block';
            }
        }).catch(e => {
            console.error(e);
        })
    }

    if (userCreationSucces) {
        document.querySelector('.new-user-view-container').style.display = 'none';
        document.querySelector('.user-creation-success').style.display = 'flex';
    }

    let handleGoBackClick = () => {
        navigate('/login');
    };
    return (
        <>
            <div className="new-user-view-container">
                <div className="new-user-form-container">
                    <div className='new-user-first-row-container'>
                        <div className='new-user-first-row-button-container'>
                            <button onClick={handleGoBackClick} legend='volver' className='new-user-go-back-button'>&#8678;</button>
                        </div>
                        <div className='new-user-first-row-title-container'>
                            <h3 className='new-user-title'>nuevo usuario</h3>
                        </div>
                    </div>
                    <div className='new-user-inputs-container'>
                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>nombre de usuario:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uName" className="new-user-input" required/>
                            </div>
                        </div>
                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>correo electrónico:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uMail" type='email' className="new-user-input" required/>
                            </div>
                        </div>

                        <p id='new-user-invalid-mail-message' className='new-user-invalid-mail-message'>mail inválido</p>
                        <div className='input'>

                            <label className='new-user-label'><p className='new-user-p'>documento número: </p></label>


                            <div className='new-user-input-container'>
                                <input id="uDocNumber" type='text' className="new-user-input" required/>
                            </div>
                            
                        </div>
                        
                        <p id='new-user-invalid-document-message' className='new-user-invalid-document-message'>documento inválido</p>

                        <div className='input'>
                            <label className='new-user-label'><p className='new-user-p'>contraseña:</p></label>
                            <div className='new-user-input-container'>
                                <input id="uPassword" type="password" className="new-user-input" required/>
                            </div>
                        </div>

                        
                    </div>

                    <div className='new-user-submit-button-container'>

                        <p id='new-user-error-message' className='new-user-error-message'>el nombre de usuario y/o mail elegidos ya fueron usados</p>
                        
                        <button className='new-user-submit-button' onClick={handleSubmitReq}>crear</button>
                    </div>

                </div>
            </div>

            <div className='user-creation-success'>
                <div className='user-creation-success-text-container'>
                    <h3 className='user-creation-success-title'> ¡Usuario creado con éxito!</h3>
                    <Link to='/login' className='user-creation-success-link'>click aquí para ir al login...</Link>
                </div>
            </div>
        </>
    );
}