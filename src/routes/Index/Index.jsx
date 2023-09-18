
import { useEffect } from 'react';
import './Index.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import reactlogo from '../../assets/images/react-logo.png';
import nodelogo from '../../assets/images/node-logo.png';
import expresslogo from '../../assets/images/express-logo.png';
export default function Index(){


    useEffect(() =>{
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                }else{
                    //entry.target.classList.remove('show');
                }
            })
        });
    
        let hiddenElements;
        if(document.querySelectorAll('.hidden-left, .hidden-right')){
            hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
            
        }        
        hiddenElements.forEach((el) =>{observer.observe(el);})

    })

    return <>   
                <NavBar />
                <div className="index-container">


                    <div className='space-between-sections'></div>

                    <section className='first-content-line hidden-left'>
                        <h2 className='company-objective-h2'> Nuestro objetivo</h2>
                        <p className='company-objective-description'>
                            Brindar una herramienta que le facilite al usuario del servicio cargar y visualizar varios de los datos de sú
                            negocio para poder tomar decisiones administrativas cómo lo puede ser decidir cuánto stock comprar de cierto producto
                            o si dejar de comprar cierto producto/cerrar o abrir un nuevo negocio, etc... mediante la visualización de datos al estilo
                            diagrama en la página de detalles de negocio o simplemente ver y subir las ventas que se hayan realizado en éste.
                        </p>
                    </section>

                    <div className='space-between-sections'></div>

                    <section className='second-content-line hidden-right'>
                        <h2 className='technologies-h2'>Tecnologías con las que trabajamos</h2>
                        <ul className='technologies-ul'>
                            <li className='technology-li'>
                                <h3 className='react-js-h3'>React.js</h3>
                                <div className='react-logo-container'>
                                    <img src={reactlogo} alt='react-logo' width={256} height={256}/>
                                </div>
                            </li>
                            
                            <li className='technology-li'>

                            <h3 className='react-js-h3'>Node.js</h3>
                                <div className='react-logo-container'>
                                    <img src={nodelogo} alt='node-logo' width={256} height={300}/>
                                </div>
                            </li>

                            <li className='technology-li'>
                            <h3 className='react-js-h3'>Express</h3>
                                <div className='react-logo-container'>
                                    <img src={expresslogo} alt='express-logo' width={256} height={256}/>
                                </div>
                            </li>   
                        </ul>
                    </section>

                    
                    <div className='space-between-sections'></div>

                    <section className='third-content-line-simulator hidden-left'></section>


                    <div className='space-between-sections'></div>

                    <section className='fourth-content-line-simulator hidden-right'></section>
                </div>

                <Footer />
            </>
}