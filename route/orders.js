const express = require('express');
const router = express.Router();

router.use(express.json());



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