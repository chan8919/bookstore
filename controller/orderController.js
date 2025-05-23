
const orderModel = require('../models/orderModel');
const cartItemModel = require('../models/cartItemModel');
const { StatusCodes } = require('http-status-codes');
const { matchedData } = require('express-validator');
const dbPool = require('../database/mariadb');
require('dotenv').config();

//결제 (주문)
const orderItems = async (req, res) => {
    console.log('orderItems 컨트롤러 호출');
    const inputData = matchedData(req, { locations: ['body', 'params', 'query'] });

    let conn;
    try {
            // DB 커넥션 생성성
        conn = await dbPool.getConnection();
        
        // 트랜잭션을 위한 커넥션 추가
        await conn.beginTransaction();
        //배송 정보 생성 (추가)
        const delivery = await orderModel.addDelivery(conn,inputData['delivery']['address'], inputData['delivery']['receiver'], inputData['delivery']['contact']);

        //주문 생성 (추가)
        const cartitemids = inputData['items'].map(item => item['cartItem_id']);
        const total_price = await orderModel.calculateTotalPriceByIds(conn,cartitemids);

        const order = await orderModel.addOrder(conn,inputData['member_id'], delivery.insertId, total_price);

        //주문 항목 생성 (추가)
        // addOrderItems에 사용할 수있는 itemlist를 만들어야함
        const inputOrderItems = inputData['items'];
        let orderitemlist = [];
        inputOrderItems.forEach((value, index) => {
            orderitemlist.push([order.insertId, value['book_id'], value['quantity']]);
        })
        await orderModel.addOrderItems(conn,orderitemlist);
        // 카트 아이템 제거
        cartItemModel.deleteCartItemsByIds(conn,cartitemids);

        // 완료되면 커넥션 커밋
        await conn.commit();

        res.status(StatusCodes.CREATED).json({ "message": "주문 완료" });
    }
    catch {
        if(conn) await conn.rollback();
        
        res.status(500).json({ "message": "문제가 났어요 .." });
        return;
    }
    finally{
        conn.release();
    }

}


//장바구니 도서 삭제
module.exports = { orderItems };