const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { authconfig } = require('../middleware/authcfg');



/* User database schema */

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    business: Boolean,
    datecreated: {
        type: Date,
        default: Date.now()
    },
    cards: Array
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


exports.validFavorites = (dataBody) => {
    let joiSchema = Joi.object({
        cards:Joi.array().min(0).required()
    });

    return joiSchema.validate(dataBody);
};



/* Token */

exports.passToken = (userid) => {
    let token = jwt.sign({_id:userid}, authconfig.jwtSecret, {expiresIn:"10h"});
    return token;
};