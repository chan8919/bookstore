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
        throw err;
    }


}
const EnsureAuthorization = () => {
    let decoded = null;
    let isRequired = true;

    const middleware = (req, res, next) => {
        console.log(isRequired);
        try {
            let receivedJWT = req.headers["authorization"];
            decoded = decodeJWT(receivedJWT, process.env.JWT_PRIVATE_KEY);
            console.log("decoded: ", decoded);

            req.jwtPayload = decoded;
            if (!decoded["id"]) throw new Error("토큰에 필요한 정보가 누락됬습니다.");
            req.user = req.user || {};
            req.user['memberId'] = decoded['id'];

            next();
            // return decoded;
        } catch (err) {
            // console.log(err);
            if (err instanceof jwt.TokenExpiredError) {
                res.status(StatusCodes.UNAUTHORIZED).json({ "message": "로그인 세션이 만료되었습니다. 다시 로그인 하세요" });
                return;
            }
            if (err instanceof jwt.JsonWebTokenError) {
                if (isRequired) {
                    res.status(StatusCodes.BAD_REQUEST).json({ "message": "인증 정보가 잘못되었습니다" });
                    return;
                } else {
                    return next();
                }
            }
            else {
                console.log(err);
                res.status(StatusCodes.NOT_FOUND).json({ "message": err.message });
                return;
            }

        }
    };

    middleware.optional = () => {
        isRequired = false;
        return middleware;
    }


    return middleware;

}

module.exports = {
    EnsureAuthorization
};