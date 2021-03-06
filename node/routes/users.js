const express = require('express');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');
const { authToken } = require('../middleware/auth');
const { validUser, validLogin, UserModel, passToken, validFavorites } = require('../models/usermdl');
const { CardModel } = require('../models/cardmdl');


const router = express.Router();



router.get('/', async(req,res) => {
    res.json({msg:"Users work!"});
});



/* Adding a new user */
router.post('/', async(req,res) => {
    let validBody = validUser(req.body);
    let uniqueUser = await UserModel.findOne({email:req.body.email});

    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    // This check is not necessary if the unique MongoDB index for an e-mail was created
    if (uniqueUser) {
        return res.status(400).json({error:"The email already in use.", code: 12000});
    }

    try {
        let user = new UserModel(req.body); // inserts modeled request to the variable
        user.password = await bcrypt.hash(user.password, 10); // password encryption
        await user.save(); // writes into database
        res.status(201).json(pick(user,["name", "email", "business","_id", "datecreated"])); // success record report

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});



/* Sign-in */
router.post('/login', async(req,res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        // E-mail check
        let user = await UserModel.findOne({email:req.body.email});
        if (!user) {
            return res.status(401).json("User or password are incorrect");
        }
        // Password check
        let validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(401).json("User or password are incorrect");
        }
        // Token creating
        let newToken = passToken(user._id);
        res.json({token:newToken}); 

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});



/* User info */
router.get('/info', authToken, async(req,res) => {
    try {
        /* Query for user info by id that stored in token
           Also ignoring password output */
        let data = await UserModel.findOne({_id:req.tokenData._id}, {password:0});
        res.json(data);
        
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});



/* User favorites */
router.get('/favcards', authToken, async(req,res) => {
    try {
        // Find user by id stored at token
        let user = await UserModel.findOne({_id:req.tokenData._id});
        // Get his cards array
        let cardsArr = user.cards;
        // Find all business numbers he liked
        let data = await CardModel.find({bsnNumber: {$in:cardsArr}});
        // Return the data
        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});



/* Update favorites */
router.patch('/cards', authToken, async(req,res) => {
    let validBody = validFavorites(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    };

    try {
        let data = await UserModel.updateOne({_id:req.tokenData._id}, req.body);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});



/* Token check not through the database */
router.get('/token', authToken, (req,res) => {
    res.json({status:"Token OK"});
});



module.exports = router;