const express = require('express');
const router = express.Router();
const { param,body, validationResult } = require('express-validator');
const { setlike } = require('../controller/likeController');
router.use(express.json());

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
    .route('/:book_id')
    .put([
        body('member_id').notEmpty().withMessage('emai 정보 누락'),
        param('book_id').notEmpty().isInt().withMessage('book id정보 이상'),
        validate
    ],setlike
)
    
module.exports = router;