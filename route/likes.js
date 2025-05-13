const express = require('express');
const router = express.Router();

router.use(express.json());



router
    .route('/:likeid')
    .put((req,res)=>{
        res.json('좋아요~');

    })
    
module.exports = router;