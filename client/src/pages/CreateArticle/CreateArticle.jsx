import { useState } from 'react';
import { Link } from "react-router-dom";
import './CreateArticle.css';
import userPlaceholderImg from '../../assets/user-placeholder.jpg'; 

const CreateArticle= () => {
    const [formData, setFormData] = useState({
      article_title: '',
      article_content: '',
    });

    // const [image, setImage] = useState(userPlaceholderImg);
    // const [preview, setPreview] = useState(null);

  //   const handleImgChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
      // const formData = new FormData()
      // formData.append('article_title', formData.article_title)
      // formData.append('article_content', formData.article_content)
      // formData.append('image', image)

      const res = await fetch('http://localhost:3000/articles/create', {
        
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
      } catch (err){
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
            name='article_title'
            className="article-title-input"
            value={formData.article_title}
            onChange={(e) => setFormData({...formData, article_title: e.target.value})}
            type="text" maxLength="50" placeholder="Title" required/>

          {/* <label>Upload an image:</label>
            <input 
              name="user-photo" 
              onChange={handleImgChange}
              type="file" accept="image/png, image/jpeg" multiple={false}/>
              <img src={preview || userPlaceholderImg} alt="Preview"/>
                  <p>Maximum size is 3MB</p> */}

          <label>Content</label>
          <textarea
            name='article_content'
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
