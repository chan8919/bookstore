
const likeModel = require('../models/likeModel');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();


const setlike = async (req, res) => {
    console.log('setlike 컨트롤러 호출');
    const {member_id} = req.body;
    const {book_id} = req.params;
    console.dir(member_id);
    console.dir(book_id);
    try {
        hasLike = await likeModel.hasMemberLikedBook(member_id,book_id);
        console.dir(hasLike);
        if(hasLike){
            await likeModel.deleteLike(member_id,book_id);
            res.status(StatusCodes.OK).json({"message":"좋아요를 취소합니다"});;
            return;
        }
        else{
            await likeModel.addLike(member_id,book_id);
            res.status(StatusCodes.CREATED).json({"message":"좋아요 됬습니다"});
            return;
        }
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}


module.exports = { setlike };