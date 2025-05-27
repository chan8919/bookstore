const likeModel = require('../models/likeModel');
const { StatusCodes } = require('http-status-codes');
const dbPool = require('../database/mariadb');
const authUtil = require('../utiles/authenticationUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const setlike = async (req, res) => {
    console.log('setlike 컨트롤러 호출');
    const { bookId } = req.params;
    const {memberId} = req.user;

    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();

        hasLike = await likeModel.hasMemberLikedBook(conn, memberId, bookId);
        console.dir(hasLike);
        if (hasLike) {
            await likeModel.deleteLike(conn, memberId, bookId);
            res.status(StatusCodes.OK).json({ "message": "좋아요를 취소합니다" });;
            return;
        }
        else {
            await likeModel.addLike(conn, memberId, bookId);
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