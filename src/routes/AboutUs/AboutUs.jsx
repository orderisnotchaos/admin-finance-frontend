
import NavBar from '../../components/NavBar2/NavBar';
import Footer from '../../components/Footer/Footer';
import BrasilImage from '../../assets/images/imagen-brasil.jpg'
import MisionImg from '../../assets/images/mission.jpg'
import ObjectiveImg from '../../assets/images/objective.png'
import './AboutUs.css';


export default function AboutUs(){


    return <>
                <NavBar />
                <div className='sobre-nosotros-container'>
                    <section className='mision-section'>
                        <h2 className='sobre-nosotros-h2'>Misión</h2>
                       
                        <p className='sobre-nosotros-p right'>Brindarle a los usuarios una interfaz para que éste pueda, 
                         mediante nuestra interfaz, mantener bajo control sús finanzas y, quizás,
                         lograr conclusiones y tomar decisiones que orienten el negocio hacia un buen lugar.  </p>
                         <img className='sobre-nosotros-image' src={MisionImg} alt='mision' />
                    </section>
                    <section className='ubicacion'>
                        <h2 className='sobre-nosotros-h2'>Ubicación</h2>
                        <img className='sobre-nosotros-image' src={BrasilImage} alt='estatua de jesús, brasil' />
                        <p className='sobre-nosotros-p left'>Mientras que el creador de la empresa se encuentra en Argentina,
                         nuestro servicio se encuentra alojado en Brasil.</p>
                         
                    </section>
                    <section className='objetivo'>
                        <h2 className='sobre-nosotros-h2'>Objetivo</h2>
                        <p className='sobre-nosotros-p right'>Nuestro objetivo es lograr conectar a la gente con las finanzas mediante nuestro sitio brindando 
                            preguntas y el servicio percé para que los usuarios puedan administrar de una forma
                            más eficiente sus cajas
                        </p>
                        <img className='sobre-nosotros-image' src={ObjectiveImg} alt='diana-tiro-con-arco' />
                    </section>

                </div>
                <Footer />
            </>
}