
import { useEffect } from 'react';
import './Index.css';
import NavBar from '../../components/NavBar2/NavBar';
import Footer from './components/Footer/Footer';
import stars from '../../assets/images/stars.jpg';
import { Link } from 'react-router-dom';
import TechCard from './components/TechCard/TechCard';
import Reactjslogo from "../../assets/images/react-logo.png";
import Expressjslogo from "../../assets/images/express-logo.png";
import Nodejslogo from "../../assets/images/node-logo.png";

export default function Index(){

    const techs = [

            {
                img: Reactjslogo,
                name: "React.js",

            },
            {
                img: Nodejslogo,
                name: "Node.js",
            },
            {
                img: Expressjslogo,
                name: "Expressjs"
            }
        ];
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

    });
    /*
        if(window.localStorage.getItem('token') !== null ||
        window.localStorage.getItem('token') !== undefined ||
        window.localStorage.getItem('token') !== '') navigate('/cuenta');
    */

    return <>   
                <NavBar isLoggedIn = {window.localStorage.getItem('isLoggedIn')}/>
                <div className="index-container">
                    <div className="stars-container">
                        <img className='stars' src={stars} alt='stars' />
                    </div>
                    <div className='title-container'>
                        <h1 className='index-title'>La gestión de todos tus negocios en un solo lugar</h1>
                        <h3 className='index-subtitle'>Somos una página de gestión de finanzas donde
                                                        podrás tener control de todo tu negocio a un click
                                                        de distancia</h3>

                        <Link to={"/crear-cuenta"} className="free-trial-link">Prueba gratis</Link>
                    </div>
                    <div className='tecnologies-container'>
                        <h3 className='second-index-subtitle hidden-left'>Tecnologías con las que trabajamos</h3>
                        <div className='technologies-container hidden-right'>
                            {techs.map((tech,i)=>{
                                return <TechCard img={tech.img} key={i} i={i} title={tech.name}/>;
                            })}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
}