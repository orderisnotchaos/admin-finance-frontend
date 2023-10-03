

import './Product.css';

export default function Product(props){

    const handleEditClick = () =>{
        if(props.editItem !== props.name){
            props.setEditItem(props.name);
        }

    }

    const handleDeleteClick = () =>{
        props.setDeleteItem(props.name);
    }
    return(
        <>
        <div id={`product-${props.name}-container`}key={props.i} className="product-container">

            <div className='product-name'>
                <p id={`${props.name}-p`}className='product-name-p'>{props.name}</p>
            </div>

            <div className='product-price'  >
                <p id={`price-p-${props.name}`} className='product-p'>${props.business_product.price}</p>
                
            </div>

            <div className='product-stock' >
                <p id={`stock-p-${props.name}`} className='product-stock-p'>{props.business_product.stock}</p>
            </div>

            <div className='product-earnings'>
                <p className='product-profit-p'>${props.business_product.profit}</p>
            </div>

            <div className ='product-quantity-sold'>
                <p className='product-quantity-sold-p'>{props.business_product.sold}</p>
            </div>

            <div className='edit-product-buttons-container'>
                <button id={`edit-button-${props.name}`} className='edit-product-button' onClick={handleEditClick}>editar</button>
                <button id={`delete-button-${props.name}`} className='edit-product-button' onClick={handleDeleteClick}>eliminar</button>

            </div>
        </div>
        </>
    );
}