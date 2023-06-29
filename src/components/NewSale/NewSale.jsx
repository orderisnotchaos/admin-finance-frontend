
import NewSaleItem from '../NewSaleItem/NewSaleItem';

import './NewSale.css';

export default function NewSale(props){

    let totalPrice = 0;
    props.data.forEach(saleItem =>{totalPrice+=Number(saleItem.price)*Number(saleItem.quantity)});

    return (
        <>
        <div className='new-sale-component'>
            <div className='tags-container'>
                <p className='sale-item-name-tag'>nombre</p>
                <p className='sale-item-quantity-tag'>cantidad</p>
                <p className='sale-price-tag'>precio</p>
            </div>
            <div className='new-sale-items-container'>
                {props.data.map(saleItem =>{return <NewSaleItem saleItem={saleItem} />})}
            </div>
            <div className='total-price-container'>
                <label className='total-price-label'><strong>total:</strong></label>
                <div className='total-price-div'>${totalPrice}</div>
            </div>
        </div>
        </>
    );
}