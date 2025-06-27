import {useContext} from "react";
import './BusinessOverview.css';
import ThemeContext from '../../contexts/themeContext.js';
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar1/NavBar";

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
export default function BusinessOverview(){

    const themeContext = useContext(ThemeContext);


    let business;

    if(themeContext.businesses !== undefined){
        for(let i = 0; i<themeContext.businesses.length;i++){
            if(themeContext.businesses[i].name === themeContext.bName) business = themeContext.businesses[i];
        }
    }   
    const color = business.Products.map(product =>{ return "#"+product.business_product.color})

    const productProfits = business !== undefined ? business.Products.map((product) =>{

        return product.business_product.profit;
    }): [];

    let totalProfit = 0;

    productProfits.forEach(productProfit => totalProfit+=productProfit);

    let conicGradientArgs = '';
    
    if(business.Products.length === 0) conicGradientArgs = 'red 0% 100%';

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

    let data = totalIncomeByDay(business)
    let businessData = {
        labels: data.days,
        datasets: [{label: "ingresos diarios",
        data: data.dailyTotalIncome,    
        }]

    };

    let incPercentageFilled = 0;

    let widths = [];

    for(let i = 0; i< business.Products.length;i++){
        if(totalProfit === 0){
            conicGradientArgs = 'black 0% 100%';
            for(let i = 0; i< business.Products.length;i++){
                widths.push(0);
            }
            break;
        }
        let thisIncPer = incPercentageFilled+productProfits[i]/totalProfit;
        widths.push(`${(productProfits[i]/totalProfit*100).toFixed(2)}%`);
        if(i===0){

            if(business.Products.length === 1){
                
                conicGradientArgs = `${color[i]} 0% ${productProfits[i]/totalProfit*100}%`;
    
                break;
            }
            conicGradientArgs = `${color[i]} 0% ${productProfits[i]/totalProfit*100}%,`;
        }else{

            
            if(i === business.Products.length-1){
                
                conicGradientArgs +=`${color[i]} ${incPercentageFilled*100}% ${thisIncPer*100}%`;
                incPercentageFilled+=thisIncPer
                break;

            }

            conicGradientArgs +=`${color[i]} ${incPercentageFilled*100}% ${thisIncPer*100}%,`;

        }

        incPercentageFilled+=productProfits[i]/totalProfit;

    }

    if(business !== undefined){
        return(
            <>
                <NavBar />
                
                <div className="business-overview-container">
                    <div className="business-overview-pie-chart-container">
                        <h4 className="pie-chart-title">gráfico de productos</h4>
                        <div className="pie-chart-table-container">
                            <ul className="pie-chart-table-titles-ul">
                                <li className="pie-chart-table-titles-li">
                                    producto
                                </li>
                                <li className="pie-chart-table-titles-li">
                                    ventas
                                </li>
                                <li className="pie-chart-table-titles-li">
                                    porcentaje
                                </li>
                                <li className="pie-chart-table-titles-li">
                                    ingresos
                                </li>

                            </ul>
                            <ul className="pie-chart-table-products-ul">
                                {business.Products.map(((product, i) =>{
                                    return <li className="pie-chart-table-products-li" key={i}>
                                                <ul className="pie-chart-row-ul">
                                                    <li className='pie-chart-row-li'>
                                                        <div className="color-container" style={{backgroundColor:color[i]}}></div>
                                                        {product.name}
                                                    </li>
                                                    <li className="pie-chart-row-li">
                                                        {product.business_product.sold}
                                                    </li>
                                                    <li className="pie-chart-row-li">
                                                        {widths[i] === 0.000 ? 100.00 : widths[i]}
                                                    </li>
                                                    <li className="pie-chart-row-li">
                                                        {product.business_product.profit}
                                                    </li>

                                                </ul>
                                            </li>
                                }))}
                            </ul>
                            <ul className="total-numbers-ul">

                                <li className="total-numbers-li">
                                    total:
                                </li>
                                <li className="total-numbers-li">
                                    100.00%
                                </li>
                                <li className="total-numbers-li">
                                    ${totalProfit}
                                </li>

                            </ul>
                        </div>
                        <div className="pie-chart-circle-container">
                            <div className="business-overview-pie-chart" style={{background:`conic-gradient(${conicGradientArgs})`}}>
                            
                            </div>
                        </div>
                    </div>
                    <div className="business-links-container">
                        <Link to={`/${themeContext.userName}/${themeContext.bName}/detalles`} className="business-overview-link">Detalles del negocio</Link>
                        <Link className="business-overview-link" to={`/${themeContext.userName}/${themeContext.bName}/ventas/agregar`}>Agregar Ventas</Link>
                        <Link to={`/${themeContext.userName}/${themeContext.bName}/ventas/historial`} className="business-overview-link">Historial de Ventas</Link>
                    </div>
                    <Line data={businessData} />
                </div>
            </>
        );
    }

    return <></>

}