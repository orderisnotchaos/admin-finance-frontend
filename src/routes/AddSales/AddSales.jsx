

import { useContext, useState, useEffect } from 'react';
import './AddSales.css';
import ThemeContext from '../../contexts/themeContext';
import NavBar from '../../components/NavBar/NavBar';
import NewSale from '../../components/NewSale/NewSale';

export default function AddSales(props){

    const themeContext = useContext(ThemeContext);

    const [saleItems,setSaleItems] = useState([]);

    const [refresh,setRefresh] = useState(false);

    let business;

    useEffect(() =>{

    },[refresh]);

    for(let i = 0; i<themeContext.businesses.length;i++){
        if(themeContext.businesses[i].name === themeContext.bName) business = themeContext.businesses[i];
    }
    
    let inputOneUserInputTextLength = document.getElementById(`${business.name}-input-1`) ? document.getElementById(`${business.name}-input-1`).value.length : 0;

    let inputOneSuggestionLength = 0;

    const products = business.Products.map(product=>product.name);

    function suggestProduct(input, productList) {
        const suggestion = productList.find(product => {return product.toLowerCase().slice(0, input.length) === input.toLowerCase()});
        return suggestion || null;
    }

    function isTextKey(key){
        if(key !== 'Enter' && key !== 'Tab' && key !== 'Alt' && key !== 'Control' && 
        key !== 'ArrowLeft' && key !== 'ArrowRight' && key !=='ArrowDown' &&
        key !== 'ArrowUp' && key !== 'Shift' && key !== 'CapsLock' && key !== 'Meta' &&
        key !== 'Escape' && key !== 'Home' &&
        key !== 'End' && key !== 'PageUp' && key !== 'PageDown' && 
        key !== 'Insert' && key !== 'ContextMenu' &&
        key !== 'NumLock' && key !== 'ScrollLock' &&
        key !=='End'){
            return true;
        }

        return false
    }
    function handleKeyPress(e){
        
        if(inputOneUserInputTextLength === 0 || e.target.value.length === 0){
            if(e.target.value.length === 0) inputOneUserInputTextLength = 0;
            if(e.key === 'Tab'){
                e.preventDefault();
                e.target.value = suggestProduct(e.target.value, products);
                inputOneSuggestionLength = e.target.value.length;
                e.target.selectionStart = e.target.value.length;

                inputOneUserInputTextLength+=e.target.value.length;
            }else{
                if(isTextKey(e.key) && e.key !== 'Backspace' && e.key !== 'Delete'){
                    inputOneUserInputTextLength+=1;
                }
            }
        }else{

            if(isTextKey(e.key)){
                if(e.key!== 'Backspace' && e.key!== 'Delete'){
                    inputOneUserInputTextLength += 1;
                }else{
                    if(e.key !== 'Delete'){
                        inputOneUserInputTextLength-=1;
                    }else{

                    }
                }
            }else{

            }
        }


        if(e.key === 'Tab'){

            if(e.target.selectionStart !== e.target.value.length){
                e.preventDefault();
                inputOneUserInputTextLength=e.target.value.length;
                e.target.setSelectionRange(inputOneSuggestionLength,inputOneSuggestionLength, 'forward');
            }

        }
        if(e.keyCode === 13){

        }
    }

    function handleKeyRelease(e){
        let productSuggestion;
        productSuggestion = suggestProduct(e.target.value, products)
                        ? suggestProduct(e.target.value, products)
                        : null;
        if(isTextKey(e.key) && e.key !== 'Backspace' && e.key !== 'Delete'){
            if(productSuggestion !== null){

                e.target.value = productSuggestion;
                inputOneSuggestionLength = productSuggestion.length;
            }
        }else{
            if(e.key === 'ArrowLeft' && e.target.selectionStart < inputOneUserInputTextLength){
                inputOneUserInputTextLength = e.target.selectionStart;
            }
        }

        if(e.key !== 'Tab'){
            if(inputOneUserInputTextLength < inputOneSuggestionLength){
                e.target.setSelectionRange(inputOneUserInputTextLength, inputOneSuggestionLength,'backward');
            }
        }
    }

    function handleGoBackClick(){
        window.history.back();
    }

    function handleAddSaleItem(){
        let name =document.getElementById(`${props.bName}-input-1`).value;
        let quantity = Number(document.getElementById(`${props.bName}-input-2`).value);
        let price = Number(document.getElementById(`${props.bName}-input-3`).value);
        if(saleItems.length <12){
            if(name !== '' && 
                !isNaN(quantity) && 
                !isNaN(price)){
                let itemExistedFlag = false;
                for(let i = 0;i<saleItems.length;i++){
                    if(saleItems[i].name === name){ 

                        if(saleItems[i].price === price){

                            saleItems[i].quantity += quantity;
                            itemExistedFlag = true;

                        }else{
                            
                            document.querySelector('p.duplicate-product-error').style.display = 'block';
                            itemExistedFlag = true;

                        }
                    }
                }

                if(!itemExistedFlag){

                    saleItems.push({name:name,
                                    quantity:quantity,
                                    price:price});
                    document.querySelector('p.must-have-all-fields-filled-paragraph').style.display = 'none';
                    document.querySelector('p.duplicate-product-error').style.display = 'none';
                }
                
            }else{
                document.querySelector('p.must-have-all-fields-filled-paragraph').style.display = 'block';
            }
        }else{
            document.querySelector('p.cannot-add-more-items-paragraph').style.display = 'block';
        }
        setRefresh(!refresh);
    }

    function suggestQuantity(){

       let input2 = document.getElementById(`${props.bName}-input-2`);
       input2.value = '1';
       input2.setSelectionRange(0,1,'backward');

    }

    function suggestPrice(){
        if(document.getElementById(`${props.bName}-input-1`).value !== ''){
            let productIndex = products.indexOf(document.getElementById(`${props.bName}-input-1`).value);
            if(productIndex !== -1){
                document.getElementById(`${props.bName}-input-3`).value = business.Products[productIndex].business_product.price;
                document.getElementById(`${props.bName}-input-3`).setSelectionRange(0,document.getElementById(`${props.bName}-input-3`).value.length,'backward');  
            }
        }
    }


    function handleNewSaleRequest(){
        let ticketType;

        if(document.getElementById('ticket-type').value === 'A') ticketType = 1;
        if(document.getElementById('ticket-type').value === 'B') ticketType = 6;
        if(document.getElementById('ticket-type').value === 'C') ticketType = 11;

        fetch(themeContext.APIURL+'user/business/newSale',{
            method:'POST',
            headers: {'Content-Type':'application/json', 'Authorization':themeContext.token},
            body:JSON.stringify({saleItems:saleItems,ticketType,bName:business.name,time:Date.now()}),
            mode:'cors'
        }).then(res =>{
            return res.json();
        }).then(res =>{

            if(res.ok === true){ 
                setSaleItems([]);
                window.localStorage.setItem('businesses',res.data);
                themeContext.setBusinesses(res.data);
                document.getElementById('sale-load-error').style.display = 'none';
                document.querySelector('p.cannot-add-more-items-paragraph').style.display = 'none';
                document.querySelector('p.duplicate-product-error').style.display = 'none';
            }
            else{

                document.getElementById('sale-load-error').style.display = 'block';
            }

        }).catch((err) => {console.error(err)});
    }

    return(<>
                <NavBar />
                <div className='new-sales-container'>
                    <div className='new-sales-window'>
                        <div className='add-sales-first-row'>
                            <div className='go-back-button-container'>
                                <button onClick={handleGoBackClick} legend='volver' className='go-back-button'>&lt;</button>
                            </div>
                            <h3 className='new-sale-add-item-title'>Agregar venta</h3>
                            <div className='ticket-type-selector-container'>
                                <label className='ticket-type-label'>factura tipo:</label>
                                <select id= 'ticket-type' className='ticket-type-select' defaultValue={'C'}>
                                    <option>C</option>
                                    <option>A</option>
                                    <option>B</option>
                                </select>
                            </div>

                            
                        </div>

                        <div className='new-sale-second-row'>
                            
                            <div className='new-sale-add-item-inputs-container'>
                                <label>producto:</label>
                                <input id={`${props.bName}-input-1`} autoComplete = "off" placeholder = {products.length > 0 ? products[0]:'tomate'} onKeyDown={handleKeyPress} onKeyUp={handleKeyRelease} name="name" type="text" className='add-sale-item-input'></input>
                                <label>cantidad:</label>
                                <input id={`${props.bName}-input-2`} name="quantity" type="text" placeholder = {1} className='add-sale-item-input' onFocus={suggestQuantity}></input>
                                <label>precio unitario:</label>
                                <input id={`${props.bName}-input-3`} onFocus={suggestPrice} name = "value" placeholder = {business.Products.length > 0 ? business.Products[0].business_product.price: 1200} type="text" className='add-sale-item-input'></input>
                                <button className='add-sale-item-button' onClick={handleAddSaleItem}>agregar</button>
                            </div>
                            <p className='must-have-all-fields-filled-paragraph'>debe llenar todos los campos</p>
                            <p className='cannot-add-more-items-paragraph'>no se pueden agregar más items</p>
                            <p className='duplicate-product-error'>no se puede cambiar el valor del producto una vez haya sido cargado</p>
                            <NewSale data = {saleItems}/>
                            <button onClick={handleNewSaleRequest}>subir</button>
                            <p id='sale-load-error' className='sale-load-error-p'>error al cargar venta</p>
                        </div>
                    </div>
                </div>
    </>);
}