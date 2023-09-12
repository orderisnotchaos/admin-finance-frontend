
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
import './SalesHistory.css';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';


export default function SalesHistory(props){

    const themeContext = useContext(ThemeContext);

    const navigate = useNavigate();

    const [sales, setSales] = useState([]);

    useEffect( () =>{
        fetch(themeContext.APIURL+'user/business/salesHistory',
        {
            method:'POST',
            referrerPolicy: "unsafe-url" ,
            headers: {'Content-Type':'application/json', 'Authorization':themeContext.token},
            mode:'cors',
            body:JSON.stringify({bName: themeContext.bName})
        }).then(res =>{
            return res.json();
        }).then(res =>{
            setSales(res.data);
        });
    },[themeContext]);

    function ticketType(ticketType){
        switch(ticketType){
            case 11:
                return 'C';
            case 6:
                return 'B';
            case 1:
                return 'A';
            default:
                return 0;
        }
    }
    return(
        <>
        <NavBar />
        <SideBar />

        <div className='sales-history-container'>
        
            <div className='sales-history-go-back-container'>
                <button className='sales-history-go-back-button' onClick={() => navigate(`/${themeContext.userName}/${themeContext.bName}`)}>&#8678;</button>
            </div>

            <div className='sales-history-categories-container'>
                <h4 className='sales-history-category'>nombre</h4>
                <h4 className='sales-history-category'>valor</h4>
                <h4 className='sales-history-category'>ticket</h4>
                <h4 className='sales-history-category'>tipo</h4>
            </div>
            <div className='sales-history-sales-container'>
                {sales.map( (sale,i) => {
                    return (<>
                            <div className='sale-container' key ={i} >
                                <label className='sale-name'>{sale.ticketName}</label>
                                <label className='sale-value'>${sale.value}</label>
                                <label className='sale-ticket'>{sale.Ticket ? sale.Ticket:'no ha sido generado'}</label>
                                <label className='sale-ticket-type'>{ticketType(sale.ticketType)}</label>
                            </div>
                            </>);
                })}
            </div>
        </div>
        </>
    );
}