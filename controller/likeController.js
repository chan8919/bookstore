const likeModel = require('../models/likeModel');
const { StatusCodes } = require('http-status-codes');
const dbPool = require('../database/mariadb');
const authUtil = require('../utiles/authenticationUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const setlike = async (req, res) => {
    console.log('setlike 컨트롤러 호출');
    // let receivedJWT = req.headers["authorization"];
    
    const { book_id } = req.params;
    //console.dir(member_id);
    console.dir(book_id);
    // console.log(receivedJWT);
    // const decoded = authUtil.decodeJWT(receivedJWT, process.env.JWT_PRIVATE_KEY);
    const decoded = authUtil.ensureAuthorization(req,res);
    if(decoded instanceof jwt.TokenExpiredError){
        res.status(StatusCodes.UNAUTHORIZED).json({"message":"로그인 세션이 만료되었습니다. 다시 로그인 하세요요"});
        return;
    }else if(decoded instanceof jwt.JsonWebTokenError){
        res.status(StatusCodes.BAD_REQUEST).json({"message":"인증 정보가 잘못되었습니다"});
        return;
    }
    if (!decoded["id"]) {
        res.status(StatusCodes.BAD_REQUEST).json("토큰에 필요한 정보가 없습니다");
        return;
    }
    const member_id = decoded["id"];

    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();

        hasLike = await likeModel.hasMemberLikedBook(conn, member_id, book_id);
        console.dir(hasLike);
        if (hasLike) {
            await likeModel.deleteLike(conn, member_id, book_id);
            res.status(StatusCodes.OK).json({ "message": "좋아요를 취소합니다" });;
            return;
        }
        else {
            await likeModel.addLike(conn, member_id, book_id);
            res.status(StatusCodes.CREATED).json({ "message": "좋아요 됬습니다" });
            return;
        }
    }
    catch (err) {
       console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}


module.exports = { setlike };