var nameRegex = /^[a-zA-Z0-9\-]+$/;
var passwordRegex = /^[a-zA-Z0-9\-\_]+$/;

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {    
    return passwordRegex.test(password);
}

function randomNum(length) {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function whiteSpace(str) {
    return str.replace(/\s/g, '');
}

export default {validateName, validatePassword, randomNum, whiteSpace}