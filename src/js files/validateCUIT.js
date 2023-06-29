

export default function validateCUIL(CUIT){
    let regex =/\b(20|23|24|27|30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g;



    return regex.test(CUIT);
}