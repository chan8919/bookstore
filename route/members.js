const express = require('express');
const router = express.Router();

router.use(express.json());



router
    .route('/join')
    .post((req,res)=>{
        res.json('회원가입');

    })

router
    .route('/login')
    .post((req,res)=>{
         res.json('회원가입');
    })

router
    .route('/reset')
    .post((req,res)=>{
         res.json('회원가입');
    })
    .put((req,res)=>{
         res.json('회원가입');
    })

    module.exports = router;
