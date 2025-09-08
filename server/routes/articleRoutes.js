const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController.js')

router.get('/', controller.getArticles);
router.get('/:id', controller.getArticleById);
router.get('/edit/:id', controller.editArticle);


module.exports = router;
