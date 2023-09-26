

import './Product.css';

import ThemeContext from '../../contexts/themeContext';

import { useContext } from 'react';

export default function Product(props){

    const themeContext = useContext(ThemeContext);

    const handleStockClick = () =>{

            document.getElementById(`stock-p-${props.i}`).style.display = `none`

            document.getElementById(`stock-input-${props.i}`).style.display = `block`;

            document.getElementById(`stock-input-${props.i}`).focus();

    }

    const handlePriceClick = () =>{

        document.getElementById(`price-p`).style.display = `none`

        document.getElementById(`price-input-${props.i}`).style.display = `block`;

        document.getElementById(`price-input-${props.i}`).focus();

}

    const handleEnter = (e) =>{

        if(e.key === `Enter`){

            if(e.target.id === `price-input-${props.i}`){
                
                document.getElementById(`price-p`).innerHTML = document.getElementById(`price-input-${props.i}`).value;

            }

            if (e.target.id === `stock-input-${props.i}`){
                
                document.getElementById(`stock-p-${props.i}`).innerHTML = document.getElementById(`stock-input-${props.i}`).value;
            
            }

            fetch(themeContext.APIURL+'user/business/updateProduct',{
                method:'POST',
                referrerPolicy: "unsafe-url" ,
                headers: { "Content-Type": "application/json", "authorization": themeContext.token },
                mode:'cors',
                body:JSON.stringify({pId:props.product.id,
                                     bId:props.product.business_product.BusinessId,
                                     stock:document.getElementById(`stock-input-${props.i}`).value,
                                     price:document.getElementById(`price-input-${props.i}`).value
                                    }),
            }).then(res =>{

                return res.json();

            }).then((res)=>{

                if(res.ok === true){

                    props.product.business_product.stock = Number(res.stock);

                    props.product.business_product.price = Number(res.price);

                    return;
                }

            }).catch((err) =>{

                console.error(err);
            
            });

            if(e.target.id === `price-input-${props.i}`){

                document.getElementById(`price-p`).style.display = `block`;

                document.getElementById(`price-input-${props.i}`).style.display = `none`;

                return;

            }

            document.getElementById(`stock-p-${props.i}`).style.display = `block`;

            document.getElementById(`stock-input-${props.i}`).style.display = `none`;
        }
    }

    const handleFocusLost = (e) =>{

        if(e.target.id === `price-input-${props.i}`){
                
            document.getElementById(`price-p-${props.i}`).innerHTML = document.getElementById(`price-input-${props.i}`).value;

        }

        if (e.target.id === `stock-input-${props.i}`){
            
            document.getElementById(`stock-p-${props.i}`).innerHTML = document.getElementById(`stock-input-${props.i}`).value;
        
        }

        fetch(themeContext.APIURL+'user/business/updateProduct',{
            method:'POST',
            headers: { "Content-Type": "application/json", "authorization": themeContext.token },
            mode:'cors',
            body:JSON.stringify({pId:props.product.id,
                                 bId:props.product.business_product.BusinessId,
                                 stock:document.getElementById(`stock-input-${props.i}`).value,
                                 price:document.getElementById(`price-input-${props.i}`).value
                                }),
        }).then(res =>{

            return res.json();

        }).then((res)=>{

            if(res.ok === true){

                props.product.business_product.stock = Number(res.stock);

                props.product.business_product.price = Number(res.price);

                return;
            }

        }).catch((err) =>{

            console.error(err);
        
        });

        if(e.target.id === `stock-input-${props.i}`){

            document.getElementById(`stock-p-${props.i}`).style.display = `block`;

            document.getElementById(`stock-input-${props.i}`).style.display = `none`;

            return;
        }

        document.getElementById(`price-p`).style.display = `block`;

        document.getElementById(`price-input-${props.i}`).style.display = `none`;

    }
    return(
        <>
        <div key={props.i} className="product-container">

            <div className={`product-name`}>
                <p className={`product-name-p`}>{props.product.name}</p>
            </div>

            <div id={`price-container-${props.i}`} className={`product-price`} onClick = {handlePriceClick} >
                <p id={`price-p-${props.i}`} className={`product-p`}>${props.product.business_product.price}</p>
                <input id={`price-input-${props.i}`} type='number' className='stock-price-input' onKeyDown={handleEnter} onBlur = {handleFocusLost} defaultValue={props.product.business_product.price}></input>
            </div>

            <div id={`stock-container-${props.i}`} className={`product-stock`} onClick={handleStockClick} >
                <p id={`stock-p-${props.i}`} className='product-stock-p'>{props.product.business_product.stock}</p>
                <input id={`stock-input-${props.i}`} type='number' className='stock-price-input' onKeyDown={handleEnter} onBlur={handleFocusLost} defaultValue={props.product.business_product.stock}></input>
            </div>

            <div className={`product-earnings`}>
                <p className={`product-profit-p`}>${props.product.business_product.profit}</p>
            </div>

            <div className = {`product-quantity-sold`}>
                <p className={`product-sold-quantity-p`}>{props.product.business_product.sold}</p>
            </div>
        </div>
        </>
    );
}