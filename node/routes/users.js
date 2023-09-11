const express = require('express');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');
const { authToken } = require('../middleware/auth');
const { validUser, validLogin, UserModel, passToken, validFavorites } = require('../models/usermdl');
const { CardModel } = require('../models/cardmdl');

const router = express.Router();

router.get('/', async(req,res) => {
    res.json({msg: "Users work!"});
});

/* Add a new user */
router.post('/', async(req,res) => {
    let validBody = validUser(req.body);
    let uniqueUser = await UserModel.findOne({email:req.body.email});

    if (validBody.error) return res.status(400).json(validBody.error.details);

    // This check isn't necessary in case if MongoDB checks for the
    // unique e-mail field
    if (uniqueUser)
    return res.status(400).json({error:"The email already in use.", code: 12000});

    try {
        // assigning modeled request to the variable
        let user = new UserModel(req.body);

        // password encryption
        user.password = await bcrypt.hash(user.password, 10);

        // writing to the database
        await user.save();

        // success record reporting
        res.status(201)
        .json(pick(user,["name", "email", "business","_id", "datecreated"]));
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});


/* Sign-in */
router.post('/login', async(req,res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        // e-mail check
        let user = await UserModel.findOne({email:req.body.email});
        if (!user)
            return res.status(401).json("User or password are incorrect");
        
        // password check
        let validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass)
            return res.status(401).json("User or password are incorrect");
        
        // token creating
        let newToken = passToken(user._id);
        res.json({token: newToken});
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});


/* User info */
router.get('/info', authToken, async(req,res) => {
    try {
        /* Get user info by id stored in token,
           resets password before sending the response */
        let data = await UserModel.findOne(
            {_id: req.tokenData._id},
            {password: 0}
        );

        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});


/* User favorites */
router.get('/favcards', authToken, async(req,res) => {
    try {
        // finding user by id stored at token
        let user = await UserModel.findOne({_id: req.tokenData._id});
        // getting his cards array
        let cardsArr = user.cards;
        // finding all business numbers he liked
        let data = await CardModel.find(
            {bsnNumber: {$in: cardsArr}}
        );

        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
});


/* Update favorites */
router.patch('/cards', authToken, async(req,res) => {
    let validBody = validFavorites(req.body);
    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        let data = await UserModel.updateOne({_id:req.tokenData._id}, req.body);
        res.json(data);
    }
    
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});


/* Token check not through the database */
router.get('/token', authToken, (req,res) => {
    res.json({status: "Token is OK"});
});


module.exports = router;