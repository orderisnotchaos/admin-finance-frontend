
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar2/NavBar';
import './FAQ.css';

export default function FAQ(){

    return <>
                <NavBar />
                    <div className='faq-container'>
                        <section className='question'>
                            <h2 className='question-h2'>¿Por qué admin-finance?</h2>
                            <p className='explanation'>Admin-Finance es un nombre lúdico que hace referencia a administra tús finanzas, nuestra misión y nuestra pasión es brindarle a la gente,
                                     las herramientas que necesitan para administrar sus finanzas de una forma sencilla y amigable. </p>
                            <h2 className='question-h2'>¿De dónde son?</h2>
                            <p className='explanation'>De Buenos Aires, Argentina.</p>
                            <h2 className='question-h2'>¿Qué hacen?</h2>
                            <p className='explanation'>Almacenamos la información financiera de nuestros clientes y la mostramos de una forma amigable en sú propia cuenta en el sistema.</p>
                            <h2 className='question-h2'>¿Cómo los contacto?</h2>
                            <p className='explanation'>Actualmente contamos con un mail de contacto al que nos podés escribir. El mail es contacto@admin-finance.com. </p>
                        </section>
                    </div>
                <Footer />
            </>;
}