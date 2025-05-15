
const bookModel = require('../models/bookModel');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

const getBooks = async (req, res) => {
    console.log('getBooks 컨트롤러 호출');
    try {
        const {category_id} = req.query;
        const books = await bookModel.getBooks(category_id);
        res.status(StatusCodes.OK).json(books);

    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}
const getBookDetial = async (req, res) => {
    console.log('getBookDetial 컨트롤러 호출');
    let {id} = req.params;
    const intid = parseInt(id);

    try {
        const book = await bookModel.getBookDetialById(intid);
        res.status(StatusCodes.OK).json(book);
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}
const getAllCategory = async (req, res) => {
    console.log('getAllCategory 컨트롤러 호출');
    try {
        const categories = await bookModel.getAllCategory();
        res.status(StatusCodes.OK).json(categories);
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}



module.exports = { getBooks,getBookDetial,getAllCategory };