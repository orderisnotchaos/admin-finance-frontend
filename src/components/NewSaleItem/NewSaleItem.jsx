

import './NewSaleItem.css';

export default function NewSaleItem(props){


    return(
        <div className='new-sale-item-component'>
            <p className='new-sale-item-name'>{props.saleItem.name}</p>
            <p className='new-sale-item-quantity'>{props.saleItem.quantity}</p>
            <p className='new-sale-item-price'>${props.saleItem.price}</p>
        </div>
    );
}