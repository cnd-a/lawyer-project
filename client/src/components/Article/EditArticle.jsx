import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Article.css';
import '../../pages/CreateArticle/CreateArticle.css';


const ARTICLE_API = import.meta.env.VITE_JURISTIQ_API;

const EditArticle= () => {
    const [articleData, setArticleData] = useState({
      article_title: '',
      article_content: '',
    });
    const { id } = useParams();
    // const [article, setArticle] = useState('');

    useEffect(() => {
    const getArticle = async () => {
      try{
        const res = await fetch(`${ARTICLE_API}/articles/${id}`);
        const data = await res.json();
        setArticleData(data[0]); //This works because the backend wraps the article in an array, you have to take the first element of that array:  
      } catch (err) {
        console.error("Failed to fetch: ", err);
      }
    };
    getArticle()
  }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{

    // console.log("Sending articleData:", articleData);
    // console.log("Endpoint:", `${ARTICLE_API}/articles/edit/${id}`);

        const res = await fetch(`${ARTICLE_API}/articles/edit/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });

        const data = await res.json();
        if (res.ok){
          setArticleData(data[0]);
          alert("Successfully edit article");
        } else{
          alert(data.message || "Failed to edit article, please try again!");
        }
      } 
      catch (err){
        console.error("Error: ", err);
        console.log("error:", err)
        alert("Failed to send data!")
      }
    }

  if (!articleData) 
    return <div className="spinner">Wait a moment or try again later...</div>

  return(
    <div className="article-form-container">
      <form onSubmit={handleSubmit}>
        <input  
        className="article-title-input" 
        type="text" 
        name="article_title" 
        value={articleData.article_title} 
        onChange={(e) => setArticleData({ ...articleData, article_title: e.target.value})} required/>
        <div className="article-page__author">
            <img
            src="https://i.kym-cdn.com/entries/icons/original/000/040/009/3dsaulcover.jpg"
            alt="author"
            className="article-page__author-image"
            />
            <h3> Kanye West </h3>
        </div>
        <img
            src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/msqd2XJ/videoblocks-police-officer-arresting-criminal-putting-him-on-car-trunk-and-reading-miranda-rights-for-him_r96cpyz6z_thumbnail-1080_01.png"
            alt="article cover"
            className="article-page__image"
        />
        <textarea 
        name="article_content" 
        className="article-content-input" 
        value={articleData.article_content}
        onChange={(e) => setArticleData({ ...articleData, article_content: e.target.value})} required/>

            <button className="btn-signup">Submit</button>
      </form>
    </div>
    
    );
}
export default EditArticle;