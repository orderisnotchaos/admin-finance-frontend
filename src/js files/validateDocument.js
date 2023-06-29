

export default function validateDocument(docNumber){
    
const regEx = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;

return regEx.test(docNumber);
}