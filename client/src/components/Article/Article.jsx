import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Article.css';

const Article = () => {
  const ARTICLE_API = import.meta.env.VITE_JURISTIQ_API;

  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try{
        const res = await fetch(`${ARTICLE_API}/articles/${id}`);
        const data = await res.json();
        setArticle(data[0]); //This works because the backend wraps the article in an array, you have to take the first element of that array:  
      } catch (err) {
        throw new Error("Failed to fetch: ", err.message);
      }
    };
    getArticle()
  }, [id]);

  if (!article) 
    return <div className="spinner">Wait a momment or ty again later...</div>

  return(
    <div className="article-page">
      <h1 className="article-page__title">{article.article_title}</h1>
      <div className="article-page__author">
        <img
          src="https://i.kym-cdn.com/entries/icons/original/000/040/009/3dsaulcover.jpg"
          alt="author"
          className="article-page__author-image"
        />
        <h3>Saul Goodman</h3>
      </div>
      <img
        src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/msqd2XJ/videoblocks-police-officer-arresting-criminal-putting-him-on-car-trunk-and-reading-miranda-rights-for-him_r96cpyz6z_thumbnail-1080_01.png"
        alt="article cover"
        className="article-page__image"
      />
      <p className="article-page__content">{article.article_content}</p>

      <Link to={`/articles/edit/${article.article_id}`}>
        <button className="btn-signup">Edit</button>
        </Link>
    </div>
    
  );
}

export default Article;
