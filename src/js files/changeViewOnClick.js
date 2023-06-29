import viewsList from "./viewsList.js";

export default function changeViewOnClick(event){

        for(let i=0;i<viewsList.length;i++){
                if(document.getElementById(`${viewsList[i]}-component`) !== null){
                        let component = document.getElementById(`${viewsList[i]}-component`);  
                        switch(component.id){   

                                case "new-business-component":
                                        document.getElementById("new-business-name-error").style.display = "none";
                                        document.getElementById("new-business-cuil-error").style.display = "none";
                                        component.style.display= "none";
                                        break;
                                case "businesses-details-component":
                                        if(event.target.id === event.target.innerText){
                                                component.style.display = "block";
                                                for(let i=0;i<component.childElementCount;i++){
                                                        if(component.children[i] === `${event.target.id}-details-component`){
                                                                component.children[i].style.display = 'block';
                                                        }else{
                                                                component.children[i].style.display = 'none';
                                                        }
                                                }
                                                document.getElementById(`${event.target.id}-details-component`).style.display = "flex";

                                        }else{  
                                                let businessDetailsNewSaleError = document.getElementById('new-sold-item-error');
                                                if(businessDetailsNewSaleError){
                                                        businessDetailsNewSaleError.style.display= "none";
                                                }
                                                component.style.display = 'none';
                                        }
                                        break;
                                default:
                                        component.style.display = "none";
                                        break;
                        }
                                
                }else{
                        return window.location.href = 'http://localhost:3000/';

                }
        }

        return document.getElementById(`${event.target.id}-component`).style.display = "flex";    
}