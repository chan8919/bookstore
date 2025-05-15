const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');

router.use(express.json());


router
    .route('/')
    .get(bookController.getBooks)
router
    .route('/categories')
    .get(bookController.getAllCategory)
router
    .route('/:id')
    .get(bookController.getBookDetial)



module.exports = router;