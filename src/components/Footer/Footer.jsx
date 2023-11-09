

import './Footer.css';

import { Link } from 'react-router-dom';

export default function Footer(){


    return (
            <>
                <footer className='index-footer'>
                    <section className='contact-card'>
                        Contacto: contacto@admin-finance.com
                    </section>
                    <section className='FAQ-card'>
                        <Link to={'/preguntas'} className='FAQ-link' > FAQ </Link>
                    </section>
                    <p className='copyright-disclaimer'>&copy;admin-finance</p>
                </footer>
            </>
    );
}