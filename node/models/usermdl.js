const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { authconfig } = require('../middleware/authcfg');



/* User database schema */

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    business: Boolean
});

exports.UserModel = mongoose.model('users', userSchema);





/* Validations */

exports.validUser = (dataBody) => {
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(32).required(),
        email:Joi.string().min(2).max(64).email().required(),
        password:Joi.string().min(6).max(64).required(),
        business:Joi.boolean().required()
    });

    return joiSchema.validate(dataBody);
};



exports.validLogin = (dataBody) => {
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(64).email().required(),
        password:Joi.string().min(6).max(64).required()
    });

    return joiSchema.validate(dataBody);
};



/* Token */

exports.passToken = (userID, biz) => {
    let token = jwt.sign({_id:userID, business:biz}, authconfig.jwtSecret, {expiresIn:"60mins"});
    return token;
};