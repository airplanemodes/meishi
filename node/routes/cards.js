const express = require('express');
const { CardModel, validCard, genBsnNumber } = require('../models/cardmdl');
const { authToken, checkIfBusinessAccount } = require('../middleware/auth');

const router = express.Router();

/* Get all cards */

router.get('/', async(req,res) => {
    try {
        let perpage = (req.query.perpage) ? Number(req.query.perpage) : 6;
        let page = (req.query.page) ? Number(req.query.page) : 0;
        let sort = (req.query.sort) ? req.query.sort : "_id";
        let reverse = (req.query.reverse == "yes") ? -1 : 1;
        
        let data = await CardModel.find({})
        .limit(perpage)
        .skip(page * perpage)
        .sort({[sort]:reverse});

        res.json(data);
    } 
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

/* Create a new card */

router.post('/', authToken, checkIfBusinessAccount, async(req,res) => {
    let validBody = validCard(req.body);

    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        let card = new CardModel(req.body);
        card.user_id = req.tokenData._id; // id assigning
        card.bsnNumber = await genBsnNumber(CardModel); // number generating
        await card.save(); // writing into database
        res.status(201).json(card); // success record report
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);        
    }
});

/* Get a single card */

router.get('/single/:cardid', async(req,res) => {
    try {
        let cardid = req.params.cardid;
        let card = await CardModel.findOne({_id:cardid});
        res.json(card);
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

/* Count how many cards in total */

router.get('/total', async(req,res) => {
    try {
        let data = await CardModel.countDocuments({});
        res.json({count:data});
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

/* Get cards created by logged user */

router.get('/usercards', authToken, async(req,res) => {
    try {
        let perpage = (req.query.perpage) ? Number(req.query.perpage) : 5;
        let page = (req.query.page) ? Number(req.query.page) : 0;
        let sort = (req.query.sort) ? req.query.sort : "_id";
        let reverse = (req.query.reverse == "yes") ? -1 : 1;
        
        let data = await CardModel.find({user_id:req.tokenData._id})
        // .limit(perpage)
        .skip(page * perpage)
        .sort({[sort]:reverse});

        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

/* Get user card info by bsn number */

router.get('/:idcard', authToken, async(req,res) => {
    let idcard = req.params.idcard; // collects from the url

    try {
        let data = await CardModel.find({bsnNumber:idcard, user_id:req.tokenData._id});
        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

/* Edit user card by mongo id property */

router.put('/:editcard', authToken, async(req,res) => {
    let editcard = req.params.editcard;
    let validBody = validCard(req.body);

    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        let data = await CardModel.updateOne({_id:editcard, user_id:req.tokenData._id}, req.body);
        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);        
    }

});

/* Delete user card by mongo id property */

router.delete('/:deletecard', authToken, async(req,res) => {
    let deletecard = req.params.deletecard;

    try {
        let data = await CardModel.deleteOne({_id:deletecard, user_id:req.tokenData._id});
        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);        
    }
});

module.exports = router;