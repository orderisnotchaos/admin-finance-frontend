import EmployeeBusiness from '../EmployeeBusiness/EmployeeBusiness';



import './EmployeeBusinesses';

export default function EmployeeBusinesses(props){

    return <>
            {props.employeeBusinesses.map((employeeBusiness, i) =>{
                return <EmployeeBusiness key = {`${employeeBusiness.name} ${i}`}  employeeBusiness = {employeeBusiness} />
            })}
            </>
}