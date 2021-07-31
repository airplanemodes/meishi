const mongoose = require('mongoose');
const Joi = require('joi');
const {random} = require('lodash');



/* Card database schema */

const cardSchema = new mongoose.Schema({
    bsnName: String,
    bsnDescription: String,
    bsnAddress: String,
    bsnPhone: String,
    bsnImageUrl: String,
    bsnNumber: Number,
    user_id: String
});

exports.CardModel = mongoose.model("cards", cardSchema);




/* Card validation */

exports.validCard = (dataBody) => {
    let joiSchema = Joi.object({
        bsnName:Joi.string().min(2).max(64).required(),
        bsnDescription:Joi.string().min(2).max(1024).required(),
        bsnAddress:Joi.string().min(2).max(256).required(),
        bsnPhone:Joi.string().min(2).max(32).required(),
        // 'allow' makes possible to send nothing or an empty string
        bsnImageUrl:Joi.string().max(512).allow(null, '')
    });

    return joiSchema.validate(dataBody);
};




/* Generating unique number */

exports.genBsnNumber = async(CardModel) => {
    while (true) {
        let randomNumber = random(1, 999999);
        let card = await CardModel.findOne({bsnNumber:randomNumber});

        if  (!card) {
            return randomNumber;
        };
    };
};