
import NavBar from '../../components/NavBar1/NavBar';
import ThemeContext from '../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState} from 'react';
import Product from "../../components/Product/Product.jsx";

import './BusinessDetails.css';
import Sale from '../../components/Sale/Sale';


export default function BusinessDetails(){

    const themeContext = useContext(ThemeContext);

    const navigate = useNavigate();

    const [sales, setSales] = useState([]);

    const [editItem, setEditItem] = useState();

    const [deleteItem, setDeleteItem] = useState();

    const [shouldRefresh, setShouldRefresh] = useState(false);
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
                navigate('/cuenta');
            }
        }).catch(err =>{
            console.log(err);
        });
    
        if(editItem && document.getElementById('editProductWindow')) document.getElementById('editProductWindow').style.display = "flex";

        if(deleteItem && document.getElementById(`product-${deleteItem}-container`)){
            fetch(themeContext.APIURL+'user/business/deleteProduct',{
                method:'POST',
                headers: {'Content-Type':'application/json', 'Authorization':themeContext.token},
                mode:'cors',
                body:JSON.stringify({bName: themeContext.bName,productName:deleteItem})
            }).then((res)=> res.json())
                .then((res)=>{
                    if(res.ok){
                        document.getElementById(`product-${deleteItem}-container`).remove();
                    }
                }).catch(err=>{ console.log(err)})
        }
    },[themeContext,navigate, editItem, deleteItem,shouldRefresh]);

    let business;
    if(themeContext.businesses !== undefined){
        for(let i = 0; i<themeContext.businesses.length;i++){
            if(themeContext.businesses[i].name === themeContext.bName) business = themeContext.businesses[i];
        }
    }  

    function handleAddProductsButtonClick(){

        document.getElementById('addProductsWindow').style.display = 'flex';
    }

    function handleAddProductButtonClick(){


        const data = {name : document.getElementById('productName').value,
                      price : document.getElementById('productPrice').value,
                      stock : document.getElementById('productStock').value};
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
                    themeContext.setBusinesses(res.businesses);
                    setShouldRefresh(!shouldRefresh);
                    document.getElementById('newProductError1').style.display = 'none';
                    document.getElementById('newProductError2').style.display = 'none';
                    document.getElementById('newProductSuccess').style.display = 'block';

                }else{
                    if(res.message === 'product already exists'){
                         document.getElementById('newProductError2').style.display = 'block';
                         document.getElementById('newProductSuccess').style.display = 'none';
                    }
                }
                
            }).catch(err =>{console.log(err)})
        }else{
            document.getElementById('newProductError1').style.display = 'block';
            document.getElementById('newProductSuccess').style.display = 'none';
        }
    }

    function handleEditProductButtonClick(){

        const data = {
                      price : document.getElementById('editProductPrice').value,
                      stock : document.getElementById('editProductStock').value}
        if(data.price && data.stock){
            fetch(themeContext.APIURL+'user/business/editProduct',{
                method:'POST',
                headers: { "Content-Type": "application/json", "Authorization": themeContext.token },
                mode:'cors',
                body: JSON.stringify({...data,name:editItem,bId:business.id})
            }).then(res=>{
                return res.json();
            }).then(res =>{
                if(res.ok){
                    themeContext.setBusinesses(res.businesses);
                    setShouldRefresh(!shouldRefresh);
                }else{
                    document.getElementById('editProductError1').style.display = 'block';
                }
                
            }).catch(err =>{console.log(err)})
        }else{
            document.getElementById('newProductError1').style.display = 'block';
            document.getElementById('newProductSuccess').style.display = 'none';
        }
    }

    function handleAddProductGoBack(e){

            document.getElementById('addProductsWindow').style.display = 'none';
            document.getElementById('newProductError1').style.display = 'none';
            document.getElementById('newProductError2').style.display = 'none';
            document.getElementById('newProductSuccess').style.display = 'none';
    }

    function handleEditProductGoBack(){
        setEditItem(undefined);
        document.getElementById('editProductWindow').style.display = 'none';
        document.getElementById('editProductError1').style.display = 'none';
    }

    function handleAddSalesClick(){
        navigate(`/${themeContext.userName}/${business.name}/ventas/agregar`);
    }

    return(
        <>
            <NavBar />
            <div className="business-details-component">
            <div className='business-details-go-back-button-container'>
                <button className='business-details-go-back-button' onClick={() => window.history.back()}>&lt;</button>
            </div>
                <div className="business-products-container">
                    <h4 className="products-title">productos</h4>
                    <ul className="product-categories-ul">
                        <li className="product-categories-li">
                            nombre
                        </li>
                        <li className="product-categories-li">
                            precio
                        </li>
                        <li className="product-categories-li">
                            stock
                        </li>
                        <li className="product-categories-li">
                            ingresos
                        </li>
                        <li className="product-categories-li">
                            ventas
                        </li>
                        <li className="product-edit-delete-category-li">
                            editar/eliminar
                        </li>
                    </ul>
                    <div className="products-ul-container">
                        <ul className="products-ul">
                            {business !== undefined ? 
                                business.Products.map((product,i)=>{
                                    return(<li key={i} className="products-li">
                                                <Product key = {i} editItem = {editItem} 
                                                         setEditItem={setEditItem} 
                                                         setDeleteItem={setDeleteItem} 
                                                         {...product}/>
                                            </li>)
                                    }):
                                    <></>}
                        </ul>
                    </div>
                    <div className="add-product-button-container">
                        <button className="add-product-button" 
                                onClick={handleAddProductsButtonClick}>agregar</button>
                    </div>
                </div>
                <div id="addProductsWindow" className="add-products-container">
                    <section className="add-products-card">
                        <div className="add-products-title-container">
                            <h4 className="add-products-title">Agregar productos</h4>
                            <button className="add-products-go-back-button" 
                                    onClick={handleAddProductGoBack}>&gt;</button>
                        </div>
                        <div className="add-products-input-container">
                            <label className="add-products-label">Nombre:</label>
                            <input id="productName" className="add-products-input"></input>
                        </div>
                        <div className="add-products-input-container">
                            <label className="add-products-label">Precio:</label>
                            <input id="productPrice" className="add-products-input"></input>
                        </div>
                        <div className="add-products-input-container">
                            <label className="add-products-label">Stock:</label>
                            <input id="productStock" className="add-products-input"></input>
                        </div>
                        <div className="add-products-button-container">
                            <p id="newProductError1" className="new-product-error-1">error al cargar el producto</p>
                            <p id = "newProductError2" className="new-product-error-1">el producto ya existe</p>
                            <p id="newProductSuccess" className="new-product-success">producto agregado con éxito</p>
                            <button className="add-products-button" onClick={handleAddProductButtonClick}>Agregar</button>
                        </div>

                    </section>
                
                    
                </div>

                <div id="editProductWindow" className="add-products-container">
                    <section className="add-products-card">
                        <div className="add-products-title-container">
                            <h4 className="add-products-title">Editar producto</h4>
                            <button id = "edit-product-go-back-button" className="add-products-go-back-button" onClick={handleEditProductGoBack}>&gt;</button>
                        </div>
                        <div className="edit-product-name-container">
                            <label id="editProductName" className="edit-product-label">{editItem ? document.getElementById(`${editItem}-p`).innerText: null}</label>
                        </div>
                        <div className="add-products-input-container">
                            <label className="add-products-label">Precio:</label>
                            <input id="editProductPrice" className="add-products-input" defaultValue={editItem ? document.getElementById(`price-p-${editItem}`).innerText.replace('$','') : null}></input>
                        </div>
                        <div className="add-products-input-container">
                            <label className="add-products-label">Stock:</label>
                            <input id="editProductStock" className="add-products-input" defaultValue={editItem ? document.getElementById(`stock-p-${editItem}`).innerText : null}></input>
                        </div>
                        <div className="add-products-button-container">
                            <p id="editProductError1" className="new-product-error-1">error al editar el producto</p>
                            <button id="editProductButton" className="add-products-button" onClick={handleEditProductButtonClick}>Editar</button>
                        </div>

                    </section>
                </div>
                <div className='business-details-sales-window'>
                    <h4 className='sales-h4'>ventas</h4>
                    <ul className='business-details-sales-titles-ul'>
                        <li className='business-details-sales-titles-name-li'>
                            nombre
                        </li>
                        <li className='business-details-sales-titles-li'>
                            total
                        </li>
                        <li className='business-details-sales-titles-li'>
                            tiempo
                        </li>
                        <li className='business-details-sales-titles-li'>
                            eliminar
                        </li>
                    </ul>
                    <div className='business-details-sales-ul-container'>
                        <ul className='business-details-sales-ul'>
                            {sales!== undefined ? sales.map((sale, i)=>{
                                return <li className='business-details-sales-li'>
                                            <Sale key = {i} data={sale}
                                                  APIURL = {themeContext.APIURL} 
                                                  token = {themeContext.token} 
                                                  bId = {business ? business.id: 0} 
                                                  shouldRefresh = {shouldRefresh}
                                                  setShouldRefresh = {setShouldRefresh} 
                                                  setBusinesses = {themeContext.setBusinesses}
                                                  />
                                        </li>
                            }): <></>}
                        </ul>
                    </div>
                    <div className='add-sales-button-container'>
                        <button className='add-sales-button' onClick={handleAddSalesClick}>agregar</button>
                    </div>
                </div>

                <div className='business-details-total-earnings-container'>
                    <label className='total-earnings-label'>ganancias totales:</label>
                    <label>${business !== undefined ? business.income : 0.00}</label>
                </div>
            </div>

        </>
    )
}