
const orderModel = require('../models/orderModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
require('dotenv').config();

//결제 (주문)
const orderItems = async (req, res) => {
    console.log('getBooks 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });
    try{
    //배송 정보 생성 (추가)
        const delivery = await orderModel.addDelivery(inputData['delivery']['address'],inputData['delivery']['receiver'],inputData['delivery']['contact']);

    //주문 생성 (추가)
        const cartitemids = inputData['items'].map(item => item['cartItem_id']);
        const {total_price} = await orderModel.calculateTotalPriceByIds(cartitemids);
        const order = await orderModel.addOrder(inputData['member_id'],delivery.insertId,total_price);
    
    //주문 항목 생성 (추가)
    // addOrderItems에 사용할 수있는 itemlist를 만들어야함
        const inputOrderItems = inputData['items'];
        let orderitemlist =[] ;
        inputOrderItems.forEach((value,index)=>{
            orderitemlist.push([order.insertId,value['book_id'],value['quantity']]);
        })
        await orderModel.addOrderItems(orderitemlist);
        res.status(StatusCodes.CREATED).json({"message":"주문 완료"});
    }
    catch{
        res.status(500).json({ "message": "문제가 났어요 .." });
        return;
    }
    
}


//장바구니 도서 삭제
module.exports = { orderItems };