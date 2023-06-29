

import './Sales.css';
import Sale from '../Sale/Sale.jsx';
export default function Sales(props){

    return(
        <>
            <div id="sales-component" className="sales-container">
                
                {props.data.sales.map((sale)=>{
                    return (
                        <>
                            <Sale data={sale} key={sale.time}></Sale>
                            <hr className='sales-hr'></hr>
                        </>
                    );
                })}
            </div>
        </>
    )
}