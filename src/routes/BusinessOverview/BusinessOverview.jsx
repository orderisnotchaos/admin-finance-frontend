import {useContext, useEffect, useState} from "react";
import './BusinessOverview.css';
import ThemeContext from '../../contexts/themeContext.js';
import Product from "../../components/Product/Product.jsx";
import Ticket from "../../components/Ticket/Ticket.jsx";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar.jsx";
import { useNavigate } from "react-router-dom";
export default function BusinessOverview(){

    const themeContext = useContext(ThemeContext);

    const navigate = useNavigate();

    const [sales, setSales] = useState([]);

    useEffect(()=>{
        fetch(themeContext.APIURL+'user/business/salesHistory',
        {
            method:'POST',
            headers: {'Content-Type':'application/json', 'Authorization':themeContext.token},
            mode:'cors',
            body:JSON.stringify({bName: themeContext.bName})
        }).then(res =>{
            return res.json();
        }).then(res =>{
            if(res.ok === true){
                setSales(res.data);
            }else{
                themeContext.setToken(null);
                navigate('/');
            }
        }).catch(err =>{
            console.log(err);
        });
    },[themeContext,navigate]);

    let business;

    if(themeContext.businesses !== undefined){
        for(let i = 0; i<themeContext.businesses.length;i++){
            if(themeContext.businesses[i].name === themeContext.bName) business = themeContext.businesses[i];
        }
    }   

    function handleAddProductsButtonClick(){

        document.getElementById('addProductWindow').style.display = 'block';
    }

    function handleAddProductButtonClick(){
        const data = {name : document.getElementById('productName').value,
                      price : document.getElementById('productPrice').value,
                      stock : document.getElementById('productStock').value}
        if(data.name && data.price){
            fetch(themeContext.APIURL+'user/business/newProduct',{
                method:'POST',
                headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
                mode:'cors',
                body: JSON.stringify({...data,bId:business.id})
            }).then(res=>{
                return res.json();
            }).then(res =>{
                if(res.ok){
                    themeContext.setBusinesses(res.data);
                    document.getElementById('newProductError1').style.display = 'none';
                    document.getElementById('newProductError2').style.display = 'none';
                }else{
                    if(res.message === 'product already exists') document.getElementById('newProductError2').style.display = 'block';
                }
                
            }).catch(err =>{console.log(err)})
        }else{
            document.getElementById('newProductError1').style.display = 'block';
        }
    }

    function handleAddProductGoBack(){
        document.getElementById('addProductWindow').style.display = 'none';
    }

    function handleAddSalesClick(){
        navigate(`/${themeContext.userName}/${business.name}/ventas/agregar`);
    }

    function handleBusinessDetailsClick(){

        navigate(`/${themeContext.userName}/${business.name}/detalles`);
    }

    function handleSalesHistoryClick(){
        navigate(`/${themeContext.userName}/${business.name}/ventas/historial`);
    }

    function handleGenerateTicketsClick(){

        document.getElementById('generate-tickets-component').style.display = 'block';
    }

    function transformDateFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      }

    function goBackClick(){
        document.getElementById('generate-tickets-component').style.display = 'none';
    }

    function generateTicket(e){

        fetch(themeContext.APIURL+'user/business/generateTicket',{
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':themeContext.token},
            mode:'cors',
            body:JSON.stringify({ticket:e.target.id.split('-')[0],bName:themeContext.bName}),
        }).then(res =>{
            return res.json();
        }).then(res =>{
            if(res.ok){
                setSales(res.data);
            }
        });
    }
    if(business !== undefined){
        return(
            <>
                <NavBar />
                <SideBar />

                <div id = "addProductWindow" className="add-product-window">
                    <div className="new-product-card">
                    
                        <h3 className="new-product-title"><button onClick={handleAddProductGoBack} className="new-product-exit-button">x</button>nuevo producto</h3>
                        <div className="new-product-input-container">
                            <label className="new-product-label">nombre:</label>
                            <div className="new-product-input-container2">
                                <input id="productName" type="text" className="new-product-input"></input>
                            </div>
                        </div>

                        <div className="new-product-input-container">
                            <label className="new-product-label">precio:</label>
                            <div className="new-product-input-container2">
                                <input id="productPrice" type="text" className="new-product-input"></input>
                            </div>
                        </div>

                        <div className="new-product-input-container">
                            <label className="new-product-label">stock:</label>
                            <div className="new-product-input-container2">
                                <input id="productStock" type="text" className="new-product-input"></input>
                            </div>
                        </div>
                        <p id="newProductError1" className="error-paragraph">debe llenar todos los campos</p>
                        <p id="newProductError2" className="error-paragraph">el producto ya existe</p>
                        <div className="new-product-button-container">
                            <button onClick={handleAddProductButtonClick} className="business-overview-button-1"> agregar</button>
                        </div>
                    </div>

                </div>

                <div id="generate-tickets-component" className="generate-tickets">
                    <div className="generate-tickets-container">
                        
                        <h3 className="generate-tickets-title"><button onClick={goBackClick} className="generate-tickets-exit-button">x</button>ventas</h3>
                        <div className="business-overview-sales-container">
                            {sales !== [] ? sales.map((sale,i) =>{

                                if(sale.Ticket === null){
                                    return (<div className="business-overview-sale-container" key={i}>
                                                <p className="ticket-name-paragraph">{sale.ticketName}</p>
                                                <p className="ticket-value-paragraph">${sale.value}</p>
                                                <p className="ticket-time-paragraph">{transformDateFormat(sale.time)}</p>
                                                <button id={`${sale.ticketName}-button`} className="business-overview-button-3" onClick={generateTicket}>generar factura</button>
                                            </div>)
                                }
                                return <></>;
                            }):<></>}
                        </div>
                        
                    </div>
                    
                </div>
                <div id={`${business.name}-overview-component`} className="business-overview">
                    
                    <div className="top-overview-content">
                        <div className="products-card">

                            <h3 className="title">productos</h3>
                            <div className="overview-container">
                                <p className="detail">nombre</p>
                                <p className="detail">precio</p>
                                <p className="detail">stock</p>
                                <p className="detail">ingresos</p>
                                <p className="detail">ventas</p>
                            </div>
                            <div className="products-container">
                                {business.Products !== undefined ? business.Products.map((product,i)=>{

                                    return <Product product={product} key={i} i={i}/>
                                }):<></>}
                                
                            </div>
                            <button className="business-overview-button-1" onClick={handleAddProductsButtonClick}>agregar</button>
                        </div>
                        <div className="last-tickets-generated">
                            <h5 className="title">últimas facturas generadas</h5>
                            <div className="tickets-container">
                                {sales !== undefined ? sales.map(sale=>{
                                    return <Ticket ticket={sale.Ticket}/>
                                }):<></>}  
                            </div>
                            <div className="generate-tickets-button-container">
                                <button className='business-overview-button-2' onClick={handleGenerateTicketsClick}>generar</button>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-overview-content">
                        <div className="business-overview-options">
                            <button className="business-overview-options-button" onClick={handleAddSalesClick}
                                >agregar ventas</button>
                            <button className="business-overview-options-button" onClick={handleBusinessDetailsClick}
                            >detalles del negocio</button>
                            <button className="business-overview-options-button" onClick={handleSalesHistoryClick}
                            >historial de ventas</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return <></>

}