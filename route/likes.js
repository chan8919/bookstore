const express = require('express');
const router = express.Router();
const { param,body, validationResult } = require('express-validator');
const { setlike } = require('../controller/likeController');
const authUtil = require('../utiles/authenticationUtils');
const {validate} = require('../utiles/validation');
router.use(express.json());

router
    .route('/:bookId')
    .put([
        authUtil.EnsureAuthorization(),
        param('bookId').notEmpty().isInt().withMessage('book id정보 이상').toInt(),
        validate
    ],
    setlike
)
    
module.exports = router;