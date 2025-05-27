
const { validationResult } = require('express-validator');

function validate(req, res, next) {
    const validatorErr = validationResult(req);
    if (!validatorErr.isEmpty()) {
        console.log(validatorErr.array());
        res.status(400).json({ 'message': validatorErr.array() });
        return;
    }
    console.log("validate 실행 완료");
    console.log('req.params:', req.params);         // 기대값: { id: '123' }
    console.log('validation errors:', validationResult(req).array());
    next();
}

module.exports = { validate };