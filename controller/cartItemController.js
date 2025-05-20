
const cartItemModel = require('../models/cartItemModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
require('dotenv').config();

//장바구니 담기기
const addToCart = async (req, res) => {
    console.log('addToCart 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    try {
        //장바구니에 이미 있는 항목인지 확인
        let cartItem = await cartItemModel.getCartItem(inputData['member_id'], inputData['book_id']);
        if (cartItem) {
            // 기존 항목에 amount 만큼 추가
            const targetAmount = inputData['amount'] + cartItem.amount;
            await cartItemModel.UpdateAmountOfCartItemById(cartItem.id, targetAmount);
            res.status(StatusCodes.OK).json({ "message": "이미 항목이 존재합니다. 주문하신 수량만큼 추가되었습니다" });
            return;
        } else {
            await cartItemModel.addCartItems(inputData['member_id'], inputData['book_id'], inputData['amount']);
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
    try {
        const items = await cartItemModel.getCartItemsByMemberId(inputData['member_id']);
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
    try {
        const itemExist = await cartItemModel.hasCartItemById(inputData['cartItemId']);
        if (itemExist) {
            await cartItemModel.deleteCartItemById(inputData['cartItemId']);
            res.status(StatusCodes.OK).json({ "message": "항목 삭제 완료" });
            return;
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "항목이 존재하지 않습니다 "});
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
    try {
        // 다수의 id를 가지고 값 가져오기
        let idList = [];
        idList = inputData['cartItemIdList'];
        if (idList.length) {
            itemList = await cartItemModel.getCartItemsByIds(idList);
            res.status(StatusCodes.OK).json({ "message": "주문 예정 목록입니다 ","bookList":itemList});
            return;
        }
        else {
            res.status(StatusCodes.NOT_FOUND).json({ "message": "항목이 존재하지 않습니다 "});
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
module.exports = { addToCart, getCartItemList,deleteCartItem,getItemListByIdArray };