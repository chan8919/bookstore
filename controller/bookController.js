
const bookModel = require('../models/bookModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
const dbPool = require('../database/mariadb');
require('dotenv').config();

const getBooks = async (req, res) => {
    console.log('getBooks 컨트롤러 호출');

    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();

        const books = await bookModel.getBooks(conn, {
            categoryId: inputData.categoryId,
            news: inputData.news,
            limit: inputData.limit,
            page: inputData.page
        });
        const totalBooksCount = await bookModel.totalBooksCount(conn, inputData.categoryId, inputData.news);
        console.log("count : ",totalBooksCount );
        res.status(StatusCodes.OK).json(
            { 
                "books": books,
                "pageInfo": { 
                    "categoryId" : inputData.categoryId,
                    "news" : inputData.news,
                    "limit": inputData.limit,
                    "totalBooksCount": totalBooksCount, 
                    "currentPage": inputData.page
                } 
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
    finally {
        if (conn) conn.release();
        return;
    }
}
const getBookDetial = async (req, res) => {
    console.log('getBookDetial 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    console.log('matchedData:', inputData);
    const memberId = req.user?.memberId || null;
    console.log("here : " + inputData.id);
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();

        const book = await bookModel.getBookDetialById(conn, inputData.id, memberId);
        res.status(StatusCodes.OK).json(book);
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
    finally {
        if (conn) conn.release();
        return;
    }
}
const getAllCategory = async (req, res) => {
    console.log('getAllCategory 컨트롤러 호출');
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();

        const categories = await bookModel.getAllCategory(conn);
        res.status(StatusCodes.OK).json(categories);
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
    }
    finally {
        if (conn) conn.release();
        return;
    }
}



module.exports = { getBooks, getBookDetial, getAllCategory };