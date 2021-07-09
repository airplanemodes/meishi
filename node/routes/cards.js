const express = require('express');
const { CardModel, validCard, genBsnNumber } = require('../models/cardmdl');
const { authToken } = require('../middleware/auth');

const router = express.Router();



/* Creating a new card */

router.post('/', authToken, async(req,res) => {
    let validBody = validCard(req.body);

    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    };

    try {
        let card = new CardModel(req.body);
        card.user_id = req.tokenData._id; // id assigning
        card.bsnNumber = await genBsnNumber(CardModel); // number generating
        await card.save(); // writing into database
        res.status(201).json(card); // success record report
    } catch (error) {
        console.log(error);
        res.status(400).json(error);        
    };

});



/* Getting user card info by business number */

router.get('/:idcard', authToken, async(req,res) => {
    let idcard = req.params.idcard; // collects id from the url request

    try {
        let data = await CardModel.find({bsnNumber:idcard, user_id:req.tokenData._id});
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
});



/* Editing user card by mongo id property */

router.put('/:editcard', authToken, async(req,res) => {
    let editcard = req.params.editcard;
    let validBody = validCard(req.body);

    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    };

    try {
        let data = await CardModel.updateOne({_id:editcard, user_id:req.tokenData._id}, req.body);
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);        
    };

});



/* Deleting user card by mongo id property */

router.delete('/:deletecard', authToken, async(req,res) => {
    let deletecard = req.params.deletecard;

    try {
        let data = await CardModel.deleteOne({_id:deletecard, user_id:req.tokenData._id});
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);        
    };

});



/* Getting all user cards info */

router.get('/usercards', authToken, async(req,res) => {
    try {
        let perpage = (req.query.perpage) ? Number(req.query.perpage) : 5;
        let page = (req.query.page) ? Number(req.query.page) : 0;
        let sort = (req.query.sort) ? req.query.sort : "_id";
        let reverse = (req.query.reverse == "yes") ? -1 : 1;
        
        let data = await CardModel.find({user_id:req.tokenData._id})
        .limit(perpage)
        .skip(page * perpage)
        .sort({[sort]:reverse});

        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
});




module.exports = router;