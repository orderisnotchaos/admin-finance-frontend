import React from "react";

import './Business.css';
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../contexts/themeContext";



export default function Business(props){

    const themeContext = React.useContext(ThemeContext);
    
    const navigate = useNavigate();

    function handleClick(){
        themeContext.setBName(props.name);
        window.localStorage.setItem('bName',props.name);
        navigate(`/${themeContext.userName}/${props.name}`);
    }


    let totalProducts = 0; 
    if(props.products !== undefined){
        props.products.forEach(()=>{ totalProducts++;});
    }
    let totalSales = 0;
    if(props.Sales !== undefined){
        props.Sales.forEach(() =>{totalSales++;})
    }

    const totalIncome = props.income;

    function calculateDailySales(sales, targetDate) {
        // Initialize a variable to store the total sales for the day
        let totalSales=[0,0];
      
        // Loop through each sale in the array
        for (let i = 0; i < sales.length; i++) {
          const sale = sales[i];
          
          // Extract the date from the timestamp string (assuming it's in a specific format)
          // For example, if the timestamp format is "YYYY-MM-DD HH:MM:SS"
          const saleDate = sale.time.substring(0, 10); // Extracts "YYYY-MM-DD"
      
          // Check if the sale occurred on the target date
          if (saleDate === targetDate) {
            // Extract the sale amount from the sale string (you may need to adjust this based on your data format)
            // For example, if the sale format is "YYYY-MM-DD HH:MM:SS - $AMOUNT"
            const saleAmount = sale.value; // Extracts the amount as a floating-point number
            
            // Add the sale amount to the total sales for the day
            totalSales[0] += 1;
            totalSales[1] += saleAmount;
          }
        }
      
        // Return the total sales for the specified day
        return totalSales;
      }
      function getCurrentDateAsString() {
        const currentDate = new Date();
      
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if needed
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        // Concatenate the date components in the desired format (e.g., "YYYY-MM-DD")
        const dateString = `${year}-${month}-${day}`;
        
        return dateString;
      }
      
      // Example usage:
      const today = getCurrentDateAsString();
      
      const dailySales = calculateDailySales(props.Sales, today);

      let soldProducts = 0;

      props.Products.forEach(product =>{
        soldProducts = product.business_product.sold;
      })
      
    return (
           
            <div id={`${props.name}-component`} className="business" onClick={handleClick}>
                <div className="business-info-container">
                    <h4 className="business-name">{props.name}</h4>
                    <ul className="business-info-ul">

                        <li className="business-info-li">
                            <label className="business-info-label">ventas del día:</label>
                            <p className="business-info-paragraph">{dailySales[0]}</p>
                        </li>
                        <li className="business-info-li-2">
                            <label className="business-info-label">ingresos del día:</label>
                            <p className="business-info-paragraph">{`$${dailySales[1].toFixed(2)}`}</p>
                        </li>
                        <li className="business-info-li">
                            <label className="business-info-label">total de ventas:</label>
                            <p className="business-info-paragraph">{totalSales}</p>
                        </li>
                        <li className="business-info-li-2">
                            <label className="business-info-label">productos vendidos:</label>
                            <p className="business-info-paragraph">{`${soldProducts}`}</p>
                        </li>
                        <li className="business-info-li">
                            <label className="business-info-label">cantidad de productos:</label>
                            <p className="business-info-paragraph">{totalProducts}</p>
                        </li>
                        <li className="business-info-li-2">
                            <label className="business-info-label">total de ingresos:</label>
                            <p className="business-info-paragraph">{`$${totalIncome}`}</p>
                        </li>
                    </ul>
                </div>
            </div>

    );

}