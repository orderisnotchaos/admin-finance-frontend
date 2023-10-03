

import Business from '../Business/Business.jsx';
import './Businesses.css';



export default function Businesses(props){

    return (
        <>  
        {props.businesses.map((business,i)=>{return <Business {...business} key={i}/>})}
        </>
    );
}