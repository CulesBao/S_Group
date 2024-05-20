import Validator from "validatorjs";

const signup = (req, res, next) => {
    let rules = {
        "email": "required|string|email",
        "password": "required|string|min:6",
        "username": "required|string",
        "phone": "numeric|min:9",
    };

    let validation = new Validator(req.body, rules);

    if (validation.fails()){
        let error = validation.errors.all();
        return res.status(400).json({error});
    }

    next();
};

export default signup;
