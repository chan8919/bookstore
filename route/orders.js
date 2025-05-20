const express = require('express');
const router = express.Router();

//router.use(express.json());
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
    .post((req,res)=>{
        res.json('주문');

    })
    .get((req,res)=>{
        res.json('주문목록');

    })

router
    .route('/:orderid')
    .post((req,res)=>{
        res.json('주문 상세 상품 조회 ')
    })
    
module.exports = router;