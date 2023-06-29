
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import ThemeContext from '../../contexts/themeContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import './BusinessDetails.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {Line} from "react-chartjs-2";

export default function BusinessDetails(props){

    const themeContext = useContext(ThemeContext);

    const navigate = useNavigate();

    const color = ['red','darkcyan','lightblue','blue','orangered','orange','yellowgreen','yellow','green'];

    const productProfits = props.business.Products.map((product) =>{

        return product.business_product.profit;
    });

    let totalProfit = 0;

    productProfits.forEach(productProfit => totalProfit+=productProfit);

    let linearGradientArgs = '';
    
    if(props.business.Products.length === 0) linearGradientArgs = 'red 0% 100%';

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

      function totalIncomeByDay(business) {
        const dailyTotalIncome = [];
        const days =[];

        
          business.Sales.forEach(sale => {
            const day =new Date(sale.time).toISOString().split('T')[0];

            if(days[days.length-1] !== day){
                days.push(day);
                dailyTotalIncome.push(sale.value);
            }else{
                dailyTotalIncome[days.length-1] += sale.value;  
            }
          });
        return {dailyTotalIncome,days};
      }

    let data = totalIncomeByDay(props.business)
    let businessData = {
        labels: data.days,
        datasets: [{label: "ingresos diarios",
        data: data.dailyTotalIncome,    
        }]

    };

    let incPercentageFilled = 0;

    let widths = [];

    for(let i = 0; i< props.business.Products.length;i++){
        let thisIncPer = incPercentageFilled+productProfits[i]/totalProfit;
        widths.push(`${productProfits[i]/totalProfit*100}%`);
        if(i===0){

            if(props.business.Products.length === 1){
                
                linearGradientArgs = `${color[i]} 0% ${productProfits[i]/totalProfit*100}%`;
    
                break;
            }
            linearGradientArgs = `${color[i]} 0% ${productProfits[i]/totalProfit*100}%,`;
        }else{

            
            if(i === props.business.Products.length-1){
                
                linearGradientArgs +=`${color[i]} ${incPercentageFilled*100}% ${thisIncPer*100}%`;
                incPercentageFilled+=thisIncPer
                break;

            }

            linearGradientArgs +=`${color[i]} ${incPercentageFilled*100}% ${thisIncPer*100}%,`;

        }

        incPercentageFilled+=productProfits[i]/totalProfit;

    }

    return(
        <>
            <NavBar />
            <SideBar />
            <div className='business-details-container'>

                <div className='business-details-go-back-container'>
                    <button className='business-details-go-back-button' onClick={() => navigate(`/${themeContext.userName}/${themeContext.bName}`)}>&#8678;</button>
                </div>
                <div className='pie-chart-and-products-container'>
                    <div className='pie-chart-container'>
                        <div className='business-details-product-percentages' style={{background:`conic-gradient(${linearGradientArgs})`}}>
                            {props.business.Products.length !== 0 ? '':'Debes agregar productos/servicios o generar ventas para visualizar los ingresos'}
                        </div>
                    </div>
                    <div className='business-details-pie-chart-labels-container'>

                        <div className='titles-container'>
                            <h4 className='business-details-h4'>valores</h4>
                        </div>
                        
                        <div className='business-details-products-container'>
                            <ul className='business-details-pie-chart-labels-ul'>
                                {props.business.Products.map((product,i) =>{
                                    return <li className='business-details-pie-chart-li' key={i}><div className={`business-details-pie-chart-color-div ${color[i]}`}></div><label>{product.name}:</label></li>;
                                })}
                            </ul>
                            <ul className='business-details-pie-chart-percentages-ul'>
                                {props.business.Products.map((product,i) =>{
                                    return <li className='business-details-pie-chart-li' key={i}><label className='percentage-label'>{totalProfit !== 0 ? (product.business_product.profit/totalProfit*100).toFixed(2):0}%</label></li>;
                                })}
                            </ul>
                            <ul className='business-details-pie-chart-prices-ul'>
                                {props.business.Products.map((product,i) =>{
                                    return <li className='business-details-pie-chart-li' key={i}><label className='price-label'>${product.business_product.profit}</label></li>;
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                <Line data={businessData} />
                <div className='business-details-total-income-container'>
                    <h3 className='total-h3'>total de ingresos:</h3>
                    <label className='total-income-label'>${totalProfit}</label>
                </div>

            </div>
        </>
    )
}