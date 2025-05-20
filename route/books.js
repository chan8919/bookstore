const express = require('express');
const router = express.Router();
//router.use(express.json());
const bookController = require('../controller/bookController');
const {param,query, body, validationResult,matchedData } = require('express-validator');


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
    .get([
        query('category_id').isInt().withMessage('category_id값이 정수형인지 확인하세요').toInt().optional(),
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
        param('id').isInt().withMessage('id값이 정수인지 확인하세요').toInt(),
        validate
    ],
    bookController.getBookDetial)



module.exports = router;