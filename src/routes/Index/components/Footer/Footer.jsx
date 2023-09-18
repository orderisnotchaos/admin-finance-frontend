

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
                        <Link to={'/FAQ'} className='FAQ-link' > FAQ </Link>
                    </section>
                    <section className='redes-card'>

                    </section>
                    {//<p className='copyright-p'>&copy; admin-finance</p>
                    } 
                </footer>
            </>
    );
}