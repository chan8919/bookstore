const express = require('express');
const router = express.Router();


const orderController = require('../controller/orderController');
const { param, query, body, validationResult, matchedData } = require('express-validator');

function validate(req, res, next) {
    const validatorErr = validationResult(req);

    if (!validatorErr.isEmpty()) {
        console.log(validatorErr.array());
        res.status(400).json({ 'message': validatorErr.array() });
        return;
    }
    next();
}

router
    .route('/')
    .post([
        body('member_id').isInt().notEmpty().withMessage('member_id의 값이 잘못되었습니다').toInt(),
        body('items').isArray().notEmpty().withMessage('items의 값이 잘못되었습니다'),
        body('items.*.cartItem_id').isInt().notEmpty().withMessage('items의 cartItem_id값이 잘못되었습니다').toInt(),
        body('items.*.book_id').isInt().notEmpty().withMessage('items의 book_id값이 잘못되었습니다').toInt(),
        body('items.*.quantity').isInt().notEmpty().withMessage('items의 quantity값이 잘못되었습니다').toInt(),
        body('delivery').notEmpty().withMessage('delivery의의 값이 잘못되었습니다'),
        body('delivery.address').isString().notEmpty().withMessage('delivery의 address값이 잘못되었습니다'),
        body('delivery.receiver').isString().notEmpty().withMessage('delivery의 receiver값이 잘못되었습니다'),
        body('delivery.contact').isString().notEmpty().withMessage('delivery의 contact값이 잘못되었습니다'),
        body('total_price').isInt().notEmpty().withMessage('total_price의의 값이 잘못되었습니다').optional(),
        validate
    ],orderController.orderItems)
    .get((req,res)=>{
        res.json('주문목록');

    
    })

router
    .route('/:orderid')
    .post((req,res)=>{
        res.json('주문 상세 상품 조회 ')
    })
    
module.exports = router;