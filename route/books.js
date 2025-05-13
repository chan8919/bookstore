const express = require('express');
const router = express.Router();

router.use(express.json());


router
    .route('/')
    .get((req,res)=>{   // 책 조회회
        res.json('책책');

    })


router
    .route('/:bookid')
    .get((req,res)=>{
        res.json('책 조회');

    })

module.exports = router;