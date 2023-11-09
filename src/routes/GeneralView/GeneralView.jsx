import React from "react";
import { useNavigate } from "react-router-dom";
import "./GeneralView.css";
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
import ThemeContext from "../../contexts/themeContext";
import NavBar from "../../components/NavBar1/NavBar";

export default function GeneralView(){


    let themeContext = React.useContext(ThemeContext);

    const navigate = useNavigate();
    const [wasInvalid, setWasInvalid] =React.useState(false);
    const [businesses, setBusinesses] = React.useState();

    React.useEffect(() =>{
        fetch(themeContext.APIURL+'general-view',{
            method:'GET',
            headers: { "Content-Type": "application/json", 'Authorization':themeContext.token},
            mode:'cors',
            }).then((res) =>{ 
                return res.json();
            }).then((res) =>{
                if(res.ok === false){
                    themeContext.setToken(null);
                    setWasInvalid(true);
                }

                if(res.ok === true){


                    setBusinesses(res.businesses);
                } 
            }).catch((em) =>{
                console.error(em);
            });

    },[themeContext]);
    if(wasInvalid === true){
        setWasInvalid(false);
        return navigate('/expired');
    }

    const colors = ["red","green","blue","yellow","orange","brown","lightblue","black","lightgreen","gray"];
        
    let totalIncome=0;
    
    let conicGradientArgs= "";

    let incomes = [];
    incomes = businesses ? businesses.map((business)=>{
        let bIncome=0;
        business.Sales.forEach(sale=>{
            bIncome+=sale.value;
        })
        return bIncome;
    }): [];

    function totalIncomeByDay(businesses) {
        const dailyTotalIncome = [];
        const days =[];

        businesses ? businesses.forEach(business => {
          business.Sales.forEach(sale => {
            const day =new Date(sale.time).toISOString().split('T')[0];

            if(days[days.length-1] !== day){
                days.push(day);
                dailyTotalIncome.push(sale.value);
            }else{
                dailyTotalIncome[days.length-1] += sale.value;  
            }
          });
        }):days.push(0);
        return {dailyTotalIncome,days};
      }
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
        let data =totalIncomeByDay(businesses);

        let businessesData ={
        labels: data.days,
        datasets: [{label: "ingresos diarios",
                    data: data.dailyTotalIncome,    
                    }]
        };        
        for(let i = 0; i<data.dailyTotalIncome.length;i++){

                totalIncome+=data.dailyTotalIncome[i];
        }

        let prevIncPer = 0;
        for(let i=0;i<incomes.length;i++){

            if(i+1 === incomes.length){
                let thisIncPer =((prevIncPer+incomes[i]/totalIncome*100));
                conicGradientArgs+= colors[i]+" "+prevIncPer+"% "+thisIncPer+"%";    
            }else{
                if(prevIncPer === 100) break;
                if(prevIncPer+incomes[i]/totalIncome*100 === 100){
                    conicGradientArgs+=colors[i]+" 0.00% 100%";
                    break;
                }
                conicGradientArgs+= colors[i]+" "+prevIncPer+"% "+(prevIncPer+incomes[i]/totalIncome*100)+"%, ";
                prevIncPer +=incomes[i]/totalIncome*100;
            }
        }
        if(totalIncome === 0){
            conicGradientArgs += "blue 0% 100%"
        }

    return(
        <>
            <NavBar />
            <div id="general-view-component" className="general-view-container"> 
                <div className="top-content">
                    <h3 className="general-view-h3">Total de ingresos</h3>

                    <div className="pie-chart-container">
                        <div id="pie-chart" className="pie-chart" style={{background:`conic-gradient(${conicGradientArgs})`}} ></div>
                    </div>

                    <div id="income-chart" className="income-chart-container">
                        <div className="businesses-profits">
                            {businesses ? businesses.map((business,i)=>{

                                return(
                                        <ul className="business-profits">
                                            <li className="business-name" key={i}>
                                                <div className={totalIncome === 0? "zero-color":`pie-chart-color-${colors[i]}`}></div>
                                                <p className="business-name-p">{business.name}:</p>
                                            </li>
                                            <li className="business-income" key={i+1}> ${incomes[i]}</li>
                                            <li className="business-income-percentage"  key={i+2}>{totalIncome === 0 ? 0 : (incomes[i]/totalIncome*100).toFixed(2)}%</li>
                                        </ul>
                                );
                            }): <></>}
                        </div>
                        <ul className="total-income-container">
                            <li className="total-income-text" key={1}><div className="total-color"></div>total: </li>
                            <li className="total-income-number" key={2}>${totalIncome}</li>
                            <li className="total-income-percentage" key={3}>100%</li>
                        </ul>
                    </div>
                </div> 
                <div className="general-view-bottom-content">
                    <h4 className="general-view-bottom-content-h4">Ingresos diarios</h4>
                    <Line data={businessesData}/>
                </div>
            </div>
        </>
    );
}