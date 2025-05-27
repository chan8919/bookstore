const express = require('express');
const router = express.Router();


const bookController = require('../controller/bookController');
const { param, query, body, validationResult, matchedData } = require('express-validator');
const { addToCart, getCartItemList, deleteCartItem,getItemListByIdArray } = require('../controller/cartItemController');
const authUtil = require('../utiles/authenticationUtils');
const {validate} = require('../utiles/validation');
router.use(express.json());

router
    .route('/')
    .post([authUtil.EnsureAuthorization(),
        body('bookId').isInt().notEmpty().withMessage('book_id의 값이 잘못되었습니다.').toInt(),
        body('quantity').isInt().notEmpty().withMessage('quantity의 값이 잘못되었습니다.').toInt(), 
        validate
    ],
        addToCart)

router
    .route('/')
    .get([
        authUtil.EnsureAuthorization(),
        body('memberId').isInt().notEmpty().withMessage('member_id의 값이 잘못되었습니다.').toInt(),
        validate
    ],
        getCartItemList)

router
    .route('/:cartItemId')
    .delete([authUtil.EnsureAuthorization(),
        param('cartItemId').isInt().notEmpty().withMessage('cartItem_id의 값이 잘못되었습니다').toInt(),
        validate
    ], deleteCartItem)

router
    .route('/items')
    .post([authUtil.EnsureAuthorization(),
        body('cartItemIdList').isArray().notEmpty().withMessage('cartItemIdList의 값이 잘못되었습니다'),
        body('cartItemIdList.*').isInt().withMessage('id값은 정수여야 합니다').toInt(),
        validate
    ], getItemListByIdArray)

module.exports = router;