
export default function validateBusinessName(businessName, businessesNames){

    let businessExists = false;

    businessesNames.forEach(business =>{if(businessName === business) businessExists = true; })

    if(businessExists) return false;
    
    if(businessName !== '' && businessName !== null &&businessName !== undefined){
        return true;
    }

    return false;
}