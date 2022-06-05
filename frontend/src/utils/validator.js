export const validateEmail = (email) => {
    
    if(!email.length){
        return {valid: false, errorMessage:'Please enter a value'}
    }
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return {valid: true, errorMessage:''}
    }else{
        return {valid: false, errorMessage: 'Please enter a valid email'}
    }
};

export const validateNumerics = value => {
    if(value !==0 && (value==null || value == undefined || value === '')){
        return {valid: false, errorMessage: 'Please enter a value'}
    }
    if((Number(value)== value && !isNaN(value)&& Number(value)>=0 && Number(value)<Infinity)){
        return {valid: true, errorMessage: ''}
    
    }else{
        return {valid: false, errorMessage: 'Please enter a numberic value'}
    }
}