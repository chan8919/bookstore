const express = require('express');
const router = express.Router();

//router.use(express.json());
const bookController = require('../controller/bookController');
const { param, query, body, validationResult, matchedData } = require('express-validator');
const { addToCart, getCartItemList, deleteCartItem,getItemListByIdArray } = require('../controller/cartItemController');


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
        body('member_id').isInt().notEmpty().withMessage('member_id의 값이 잘못되었습니다.').toInt(),
        body('book_id').isInt().notEmpty().withMessage('book_id의 값이 잘못되었습니다.').toInt(),
        body('amount').isInt().notEmpty().withMessage('amount의 값이 잘못되었습니다.').toInt(), validate
    ],
        addToCart)

router
    .route('/')
    .get(body('member_id').isInt().notEmpty().withMessage('member_id의 값이 잘못되었습니다.').toInt(), validate,
        getCartItemList)

router
    .route('/:cartItemId')
    .delete([
        param('cartItemId').isInt().notEmpty().withMessage('cartItem_id의 값이 잘못되었습니다').toInt(),
        validate
    ], deleteCartItem)

router
    .route('/items')
    .post([
        body('cartItemIdList').isArray().notEmpty().withMessage('cartItemIdList의 값이 잘못되었습니다'),
        body('cartItemIdList.*').isInt().withMessage('id값은 정수여야 합니다').toInt(),
        validate
    ], getItemListByIdArray)

module.exports = router;