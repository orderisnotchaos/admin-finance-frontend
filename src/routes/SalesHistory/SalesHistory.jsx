
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../contexts/themeContext';
import './SalesHistory.css';
import NavBar from '../../components/NavBar1/NavBar';

export default function SalesHistory(props){

    const themeContext = useContext(ThemeContext);

    const [sales, setSales] = useState([]);

    useEffect( () =>{
        fetch(themeContext.APIURL+'user/business/salesHistory',
        {
            method:'POST',
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

        <div className='sales-history-container'>
        
        <div className='sales-history-go-back-button-container'>
            <button className='sales-history-go-back-button' onClick={() => window.history.back()}>&lt;</button>
            </div>
            <div className='sales-history-categories-container'>
                <h4 className='sales-history-category'>nombre</h4>
                <h4 className='sales-history-category'>valor</h4>
                <h4 className='sales-history-category'>ticket</h4>
                <h4 className='sales-history-category'>tipo</h4>
            </div>
            <div className='sales-history-sales-container'>
                {sales !== null ? sales.map( (sale,i) => {
                    return (<>
                            <div className='sale-history-sale-container' key ={i} >
                                <p className='sale-history-sale-name'>{sale.ticketName}</p>
                                <p className='sale-history-sale-value'>${sale.value}</p>
                                <p className='sale-history-sale-ticket'>{sale.Ticket ? sale.Ticket:'no ha sido generado'}</p>
                                <p className='sale-history-sale-ticket-type'>{ticketType(sale.ticketType)}</p>
                            </div>
                            </>);
                }): <></>}
            </div>
        </div>
        </>
    );
}