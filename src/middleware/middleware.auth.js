var nameRegex = /^[a-zA-Z0-9\-]+$/;
var passwordRegex = /^[a-zA-Z0-9\-\_]+$/;

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {    
    return passwordRegex.test(password);
}

function validation(req, res, next) {
    const user = req.body;
    console.log(user.username, user.password);

    if (validateName(user.username) && validatePassword(user.password)) {
        next();
    } else {
        res.status(400).send('Invalid name or password');
    }
}

export default {validation};
