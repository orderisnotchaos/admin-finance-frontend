
import './Sale.css';

export default function Sale(props){

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

      const handleDeleteSaleButton = () =>{
        fetch(props.APIURL+'user/business/deleteSale',{
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':props.token},
            mode: 'cors',
            body:JSON.stringify({ticketName:props.data.ticketName, bId:props.bId})
        }).then(res =>{
            return res.json();
        }).then((res) =>{
            if(res.ok){
                document.getElementById(`sold-item-${props.data.ticketName}`).remove();
            }
        })
      };
    return(
            <div id = {`sold-item-${props.data.ticketName}`} className='sale-container'>
                <p className='sold-name'>{props.data.ticketName}</p>
                <p className='sold-total-price'>${props.data.value}</p>
                <time className='sold-product-time'>{transformDateFormat(props.data.time)}</time>
                <button className='sold-delete-button' onClick={handleDeleteSaleButton}>eliminar</button>
            </div>
    );
}