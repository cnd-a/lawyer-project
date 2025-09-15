const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController.js')

router.get('/', controller.getArticles);
router.post('/create', controller.createArticle);
router.get('/:id', controller.getArticleById);
router.post('/edit/:id', controller.editArticle);


module.exports = router;
