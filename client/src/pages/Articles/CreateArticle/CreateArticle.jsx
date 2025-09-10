import { useState } from 'react';
import { Link } from "react-router-dom";
import './CreateArticle.css'; 

const CreateArticle= () => {
    const [formData, setFormData] = useState({
      article_title: '',
      article_content: '',
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await fetch('http://localhost:3000/articles', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok){
          alert("Successfully created article");
          // setFormData({
          //   first_name: '',
          //   last_name: '',
          //   location: '',
          //   biography: '',
          //   experience: ''
          // });
        } else{
          alert(data.message || "Failed to create article, please try again!");
        }
      } 
      catch (err){
        console.error("Error: ", err);
        alert("Failed to send data!")
      }
    }
  
    return(
      <div className="article-form-container">
        <Link to="/articles">Back</Link>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            className="article-title-input"
            value={formData.article_title}
            onChange={(e) => setFormData({ ...formData, article_title: e.target.value})}
            type="text" maxLength="50" placeholder="Title" required/>

          <label>Content</label>
          <textarea
            className="article-content-input"
            value={formData.article_content}
            onChange={(e) => setFormData({ ...formData, article_content: e.target.value})}
            type="text" maxLength="100000" placeholder="Content..." required/>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
};

export default CreateArticle;
