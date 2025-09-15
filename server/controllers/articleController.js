const db = require('../db.js')

const getArticles = async (req, res) => {
  try{
    const articles = await db.query('SELECT * FROM articles;');
    res.status(200).json(articles);
  } catch(err) {
    console.error(err);
  }
};

const getArticleById = async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const articleById = await db.query('SELECT * FROM articles WHERE article_id = ?', [id])
    res.status(200).json(articleById);
  } catch(err) {
    console.error(err);
  }
};

const createArticle = async (req, res) => {
  const { article_title, article_content } = req.body

  try {
    const createArticle = await db.query(
      'INSERT INTO articles (article_title, article_content) VALUES (?, ?);', [article_title, article_content]
    );
    res.status(201).json({ message: `Article added with ID: ${createArticle.article_id}` });
  } catch(err) {
    console.error( err, "Unable to insert query!")
    // res.status(500).send({ message: 'Insert query failed!'})
  }
}

const editArticle = async(req, res) => {
  const id = parseInt(req.params.id);
  const { article_title, article_content } = req.body

  try {
    const EditArticleById = await db.query('UPDATE articles SET article_title = ?, article_content = ? WHERE article_id = ?', [article_title, article_content, id])
    res.status(200).json({ message: `Article edited with ID: ${id}` } ,EditArticleById);
  } catch(err) {
    console.error(err);
  }
};

module.exports = { getArticles, getArticleById, createArticle, editArticle }
