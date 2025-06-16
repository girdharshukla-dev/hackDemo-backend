const jwt = require("jsonwebtoken");

const secretkey = process.env.JWT_SECRET_KEY;

function setUserToken({id , email}){
    return jwt.sign({
        id : id,
        email : email
    } , secretkey , {expiresIn : "7d"});
}

function decodeToken(token){
    try{
        return jwt.verify(token, secretkey);
    }catch(err){
        console.log("Decoding jwt token failed ...." + err);
        return null;
    }
}

module.exports = {
    setUserToken,
    decodeToken
}