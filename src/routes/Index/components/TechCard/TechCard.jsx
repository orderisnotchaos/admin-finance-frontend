

import './TechCard.css';


export default function TechCard(props){


    return <div id={`tech-card-${props.i}`}className='tech-card'>

                <h4 className='tech-title'>{props.title}</h4>
                <div className='tech-image-container'>
                    <img className='tech-image' src={props.img} alt={`${props.title}-logo`}></img>
                </div>
            </div>

}