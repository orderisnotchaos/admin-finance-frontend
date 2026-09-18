import { useContext } from "react";
import NavBar from "../../components/NavBar1/NavBar";


import './AddEmployees.css'
import ThemeContext from "../../contexts/themeContext";

export default function AddEmployees(){

    const themeContext = useContext(ThemeContext);

    function addEmployeeClick(event){

        let business = themeContext.businesses.filter((business) => business.name === themeContext.bName);

        let businessId = business[0].id;

        let message = {
            businessId: businessId,
            message:"test"
        }
        fetch(themeContext.APIURL+'user/newEmployee',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': themeContext.token
            },
            body: JSON.stringify(message)
        }).then((res)=>{
            return res.json();
        }).then((res) =>{

            document.getElementById("add-employee-input").value = res.token;
        })
    }
    return <>
            <NavBar />
            <div className="add-employee-container">
                <div className="add-employee-card-container">
                    <h2 className="add-employee-h2"> Acá podés generar tu token </h2>

                    <input id = "add-employee-input" className="add-employee-token-input" readOnly placeholder="aquí estará su token..."></input>
                    <div className="add-employee-button-container">
                        <button className="add-employee-button" onClick={addEmployeeClick}>generar token</button>                
                    </div>
                </div>
            </div>
        </>
}