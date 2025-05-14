const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const memberModel = require('../models/momberModel');
const { StatusCodes } = require('http-status-codes');
const { join, login, passwordReset, passwordResetRequest } = require('../controller/memberController');

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
    .route('/join')
    .post([
        body('email').notEmpty().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        body('name').notEmpty().withMessage('name 정보 누락'),
        validate
    ], join)

router
    .route('/login')
    .post([
        body('email').notEmpty().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        validate
    ], login)

router
    .route('/reset')
    .post([
        body('email').notEmpty().withMessage('email 정보 누락'),
        validate
    ], passwordResetRequest)
    .put([
        body('email').notEmpty().withMessage('email 정보 누락'),
        body('pwd').notEmpty().withMessage('pwd 정보 누락'),
        validate
    ],
        passwordReset)

module.exports = router;
