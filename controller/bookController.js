
const bookModel = require('../models/bookModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
require('dotenv').config();

const getBooks = async (req, res) => {
    console.log('getBooks 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    try {
        const books = await bookModel.getBooks({
            category_id:inputData.category_id,
            news:inputData.news,
            limit:inputData.limit,
            page:inputData.page
        });
        res.status(StatusCodes.OK).json(books);
    }
    catch(err){
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
}
const getBookDetial = async (req, res) => {
    console.log('getBookDetial 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });

    try {
        const book = await bookModel.getBookDetialById(inputData.id);
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