import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import './Help.css';


export default function Help(){

    const mail = 'help@admin-finance.com';
    return(
        <>
        <NavBar />
        <SideBar />
        <div className = 'help-content'>
            <p className="help-text">por cualquier consulta, objeción y/o problema que pueda estar encontrando por el momento puede contactarse a {mail} ¡Gracias!</p>
        </div>
        </>
    );
}