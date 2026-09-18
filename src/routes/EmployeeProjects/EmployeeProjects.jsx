import NavBar from "../../components/NavBar1/NavBar";
import {useContext, useEffect, useState} from 'react';
import ThemeContext from "../../contexts/themeContext";
import EmployeeBusinesses from "../../components/EmployeeBusinesses/EmployeeBusinesses";

import './EmployeeProjects.css';


export default function EmployeeProjects() {

        const [employeeBusinesses, setEmployeeBusinesses] = useState([]);

        const themeContext = useContext(ThemeContext);
        useEffect(()=>{
        fetch(themeContext.APIURL + 'user/employeeBusinesses',{
            method: 'GET',  
            headers: {'Content-Type':'application/json','Authorization':themeContext.token}
        }).then((response) => response.json()).then((data) => {

            setEmployeeBusinesses(data.businesses);
        }).catch((error) => {
            console.error('Error fetching employee businesses:', error);
        });

        },[themeContext.APIURL,themeContext.token ])
        function handleAddProjectClick(event){

            let token = document.getElementById("employee-projects-input").value;

            fetch(themeContext.APIURL+ 'user/addEmployee',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': themeContext.token
                },
                body: JSON.stringify({token:token})
            }).then((res) => res.json()).then((res) =>{

                if(res.ok){
                    window.location.reload();
                }
            }).catch(e =>{
                console.error(e)
            })
        }
    return(
        <>
            <NavBar />
            <div className="employee-projects-add-container">
                <input id="employee-projects-input" type="text" className="employee-projects-add-input" placeholder="Enter project token..." />
                <button className="employee-projects-add-button" onClick = {handleAddProjectClick}>Add Project</button>
            </div>
            <div className="employee-projects-businesses-container">
                {employeeBusinesses?<EmployeeBusinesses employeeBusinesses = {employeeBusinesses} />
                : <p className="employee-projects-no-businesses">No businesses found.</p>}    
            </div>
        </>
    );
}