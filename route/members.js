const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { join,login,resetPassword,resetRequestPassword } = require('../controller/memberController');
const authUtil = require('../utiles/authenticationUtils');
const {validate} = require('../utiles/validation');
router.use(express.json());

router
    .route('/join')
    .post([
        body('email').notEmpty().isEmail().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        body('name').notEmpty().withMessage('name 정보 누락'),
        validate
    ], join)

router
    .route('/login')
    .post([
        body('email').notEmpty().isEmail().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        validate
    ], login)

router
    .route('/reset')
    .post([
        body('email').notEmpty().isEmail().withMessage('email 정보 누락'),
        validate
    ], resetRequestPassword)
    .put([
        body('email').notEmpty().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        validate
    ],
        resetPassword)

module.exports = router;
