const express = require('express');
const router = express.Router();

router.use(express.json());

router
    .route('/')
    .post((req,res)=>{   // 책 등록
        res.json('장바구니 항목 추가가');
    })

router
    .route('/:memberid')
    .get((req,res)=>{
        res.json('장바구니조회회')
    })

router.delete('/:itemid',(req,res)=>{
    res.json('제거요청');
})

module.exports = router;