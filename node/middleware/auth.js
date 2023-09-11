const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/usermdl');
const { authconfig } = require('./authcfg');

/* Authentication token */
exports.authToken = (req,res,next) => {
    let validToken = req.header("x-auth-token");
    if (!validToken) return res.status(401).json({msg:"Token needed"});

    try {
        let decodeToken = jwt.verify(validToken, authconfig.jwtSecret);
        req.tokenData = decodeToken;
        next();
    }
    
    catch (error) {
        console.log(error);
        res.status(401).json({error:"Token invalid or expired"});        
    }
}


// middleware function that checks if the account is business
exports.checkIfBusinessAccount = async(req,res,next) => {
    try {
        let user = await UserModel.findOne({_id:req.tokenData._id, business:true});
        if (!user) return res.status(401).json({msg:"Business account needed"});

        // go next function, if all fine
        next();
    }
    
    catch (error) {
        console.log(error);
        res.status(401).json(error); 
    }
}