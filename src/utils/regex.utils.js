var nameRegex = /^[a-zA-Z0-9\-]+$/;
var passwordRegex = /^[a-zA-Z0-9\-\_]+$/;

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {    
    return passwordRegex.test(password);
}

function randomNum(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default {validateName, validatePassword, randomNum}