const express = require('express');
const router = express.Router();


const orderController = require('../controller/orderController');
const { param, query, body, validationResult, matchedData } = require('express-validator');
const authUtil = require('../utiles/authenticationUtils');
const {validate} = require('../utiles/validation');



router
    .route('/')
    .post([authUtil.EnsureAuthorization(),
        body('memberId').isInt().notEmpty().withMessage('memberId의 값이 잘못되었습니다').toInt(),
        body('items').isArray().notEmpty().withMessage('items의 값이 잘못되었습니다'),
        body('items.*.cartItemId').isInt().notEmpty().withMessage('items의 cartItemId값이 잘못되었습니다').toInt(),
        body('items.*.bookId').isInt().notEmpty().withMessage('items의 bookId값이 잘못되었습니다').toInt(),
        body('items.*.quantity').isInt().notEmpty().withMessage('items의 quantity값이 잘못되었습니다').toInt(),
        body('delivery').notEmpty().withMessage('delivery의의 값이 잘못되었습니다'),
        body('delivery.address').isString().notEmpty().withMessage('delivery의 address값이 잘못되었습니다'),
        body('delivery.receiver').isString().notEmpty().withMessage('delivery의 receiver값이 잘못되었습니다'),
        body('delivery.contact').isString().notEmpty().withMessage('delivery의 contact값이 잘못되었습니다'),
        body('totalPrice').isInt().notEmpty().withMessage('totalPrice의 값이 잘못되었습니다').optional(),
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