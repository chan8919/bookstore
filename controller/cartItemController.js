
const cartItemModel = require('../models/cartItemModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
const dbPool = require('../database/mariadb');
require('dotenv').config();

//장바구니 담기기
const addToCart = async (req, res) => {
    console.log('addToCart 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    const {memberId} = body.user;
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();
        //장바구니에 이미 있는 항목인지 확인
        let cartItem = await cartItemModel.getCartItem(conn, memberId, inputData['bookId']);
        if (cartItem) {
            // 기존 항목에 quantity 만큼 추가
            const targetQuantity = inputData['quantity'] + cartItem.quantity;
            await cartItemModel.UpdateQuantityOfCartItemById(conn, cartItem.id, targetQuantity);
            res.status(StatusCodes.OK).json({ "message": "이미 항목이 존재합니다. 주문하신 수량만큼 추가되었습니다" });
            return;
        } else {
            await cartItemModel.addCartItems(conn, memberId, inputData['bookId'], inputData['quantity']);
            res.status(StatusCodes.CREATED).json({ "message": "장바구니에 항목이 추가되었습니다" });
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
        return;
    }
}

//장바구니 아이템 목록 조회

const getCartItemList = async (req, res) => {
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    const {memberId} = body.user;
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();
        const items = await cartItemModel.getCartItemsByMemberId(conn, memberId);
        console.log(items);
        res.status(StatusCodes.OK).json({ "message": "사용자의 장바구니 목록입니다", "books": items });
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
        return;
    }
}

const deleteCartItem = async (req, res) => {
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();
        const itemExist = await cartItemModel.hasCartItemById(conn, inputData['cartItemId']);
        if (itemExist) {
            await cartItemModel.deleteCartItemById(conn, inputData['cartItemId']);
            res.status(StatusCodes.OK).json({ "message": "항목 삭제 완료" });
            return;
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "항목이 존재하지 않습니다 " });
            return;
        }
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
        return;
    }
}

const getItemListByIdArray = async (req, res) => {
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    let conn;
    try {
        // DB 커넥션 생성성
        conn = await dbPool.getConnection();
        // 다수의 id를 가지고 값 가져오기
        let idList = [];
        idList = inputData['cartItemIdList'];
        if (idList.length) {
            itemList = await cartItemModel.getCartItemsByIds(conn, idList);
            res.status(StatusCodes.OK).json({ "message": "주문 예정 목록입니다 ", "bookList": itemList });
            return;
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "항목이 존재하지 않습니다 " });
            return;
        }


    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes.BAD_REQUEST).json("err");
        return;
    }
}

//장바구니 도서 삭제
module.exports = { addToCart, getCartItemList, deleteCartItem, getItemListByIdArray };