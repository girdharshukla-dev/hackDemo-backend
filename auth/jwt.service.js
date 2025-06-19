const jwt = require("jsonwebtoken");

const secretkey = process.env.JWT_SECRET_KEY;
if(!secretkey){
    console.log("JWT secret key not imported");
    process.exit(1);
}

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