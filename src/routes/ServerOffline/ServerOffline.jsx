
import serverOfflinePic from '../../assets/images/new-business-server-error.jpg';
import { Link } from 'react-router-dom';
import './ServerOffline.css';
export default function ServerOffline(){


    return(
        <>
            <Link to="/"><button className="server-offline-btn">Back to Login</button></Link>
            <img className= "server-offline-pic" src={serverOfflinePic} alt="server offline"></img>
        </>
    );
}