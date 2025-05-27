const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController');
const {param,query, body, validationResult,matchedData } = require('express-validator');
const authUtil = require('../utiles/authenticationUtils');
const {validate} = require('../utiles/validation');
router.use(express.json());


router
    .route('/')
    .get([
        query('categoryId').isInt().withMessage('category_id값이 정수형인지 확인하세요').toInt().optional(),
        query('news').isBoolean().withMessage('id값이 불리언값인지 확인하세요').toBoolean().optional(),
        query('limit').isInt().withMessage('limit값이이 정수형인지 확인하세요').toInt().optional(),
        query('page').isInt().withMessage('page값이 정수형인지 확인하세요').toInt().optional(),
        validate
    ],
        bookController.getBooks)
router
    .route('/categories')
    .get(bookController.getAllCategory)
router
    .route('/:id')
    .get([
        authUtil.EnsureAuthorization().optional(),
        param('id').isInt().withMessage('id값이 정수인지 확인하세요').toInt(),
        validate
    ],
    bookController.getBookDetial)



module.exports = router;