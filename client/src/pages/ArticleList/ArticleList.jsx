import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

const ArticleList = () => {
  const ARTICLE_API = import.meta.env.VITE_JURISTIQ_API;

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetch(`${ARTICLE_API}/articles`);
        const data = await res.json();
        setArticles(data); 
      } catch (err) {
        console.error(err);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="article-list">
      {articles.map((article) => (
        <Link
          to={`/articles/${article.article_id}`}
          key={article.article_id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="article-card">
            <img
              className="article-card-image"
              src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/msqd2XJ/videoblocks-police-officer-arresting-criminal-putting-him-on-car-trunk-and-reading-miranda-rights-for-him_r96cpyz6z_thumbnail-1080_01.png"
              alt="article"
            />

            <div className="article-card-details">
              <div className="article-card-poster">
                <img
                  src="https://i.kym-cdn.com/entries/icons/original/000/040/009/3dsaulcover.jpg"
                  alt="user avatar"
                />
                <h3>Saul Goodman</h3>
              </div>

              <h2 className="article-card-title">{article.article_title}</h2>
              <p className="article-card-content">{article.article_content}</p>
            </div>
          </div>
        </Link>
      ))}
      <Link to={'/articles/create'}>
      <button className="article-list-button" type="submit">➕</button>
      </Link>
    </div>  
  );
};

export default ArticleList;
