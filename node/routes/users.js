const express = require('express');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');
const { authToken } = require('../middleware/auth');
const { validUser, validLogin, UserModel, passToken, validFavorites } = require('../models/usermdl');

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

    if (uniqueUser) {
        return res.status(400).json({error:"The user already registered."})
    }

    try {
        let user = new UserModel(req.body); // inserts modeled request to the variable
        user.password = await bcrypt.hash(user.password, 10); // encryption
        await user.save(); // writes into database
        res.status(201).json(pick(user,["name", "email", "business","_id", "datecreated"])); // success record report

    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({error:"The user already logged in!", code: 11000});
        }

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



/* Getting info */
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



module.exports = router;