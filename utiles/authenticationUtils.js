const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const decodeJWT = (token, privateKey) => {

    let decoded = null;
    try {
        decoded = jwt.verify(token, privateKey);
        console.log("decoded: ", decoded);
        return decoded;
    }
    catch (err) {
        console.log(err);
        return err;
    }


}
const ensureAuthorization = (req,res) => {
    let decoded = null;
    try{
        let receivedJWT = req.headers["authorization"];
        const decoded = decodeJWT(receivedJWT, process.env.JWT_PRIVATE_KEY);
        return decoded;
    }catch(err){
        //console.log(err);
        return err;
    }
}
    

module.exports = {
    decodeJWT,
    ensureAuthorization
};