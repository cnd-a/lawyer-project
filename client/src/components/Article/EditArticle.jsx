import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Article.css';
import '../../pages/CreateArticle/CreateArticle.css';




const EditArticle= () => {
    const [articleData, setArticleData] = useState({
      article_title: '',
      article_content: '',
    });
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await fetch(`http://localhost:3000/articles/edit/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });

        const data = await res.json();
        if (res.ok){
          setArticle(data[0]);
          alert("Successfully created article");
        } else{
          alert(data.message || "Failed to create article, please try again!");
        }
      } 
      catch (err){
        console.error("Error: ", err);
        alert("Failed to send data!")
      }
    }

  useEffect(() => {
    const getArticle = async () => {
      try{
        const res = await fetch(`http://localhost:3000/articles/edit/${id}`);
        const data = await res.json();
        setArticle(data[0]); //This works because the backend wraps the article in an array, you have to take the first element of that array:  
      } catch (err) {
        console.error("Failed to fetch: ", err);
      }
    };
    getArticle()
  }, [id]);

  if (!article) 
    return <div className="spinner">Wait a momment or ty again later...</div>

  return(
    <div className="article-form-container">
      <form onSubmit={handleSubmit}>
        <input  className="article-title-input" type="text" name="title" value={article.article_title} onChange={(e) => setArticleData({ ...articleData, article_title: e.target.value})}/>
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
        <textarea name="content" className="article-content-input" onChange={(e) => setArticleData({ ...articleData, article_title: e.target.value})} value={article.article_content}/>

            <button className="btn-signup">Submit</button>
      </form>
    </div>
    
    );
}
export default EditArticle;