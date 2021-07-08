const jwt = require('jsonwebtoken');
const {authconfig} = require('./authcfg');

/* Authentication token */
exports.authToken = (req,res,next) => {
    let validToken = req.header("x-auth-token");
    if (!validToken) {
        return res.status(401).json({msg:"Token needed"});
    }

    try {
        // Verifying
        let decodeToken = jwt.verify(validToken, authconfig.jwtSecret);
        req.tokenData = decodeToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Token invalid or expired"});        
    }
};