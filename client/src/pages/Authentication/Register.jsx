import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userPlaceholderImg from '../../assets/user-placeholder.jpg';
import './Auth.css';

const longText = "People who use our service may have uploaded your contact information to Lawyery. Learn more. By tapping Submit, you agree to create an account and to Lawyery's Terms, Privacy Policy and Cookies Policy. The privacy policy describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalise and improve our products, including ads."

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });
  const [image, setImage] = useState(userPlaceholderImg);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('email', registerData.email)
      formData.append('password', registerData.password)
      formData.append('image', image)

      const res = await fetch('http://localhost:3000/users/register', {
        method: "POST",
        /* If you set only "multipart/form-data" manually, the boundary is missing → the server can’t parse the request. The browser knows how to generate the correct boundary
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData), */
        body: formData,
      });

      const data = await res.json();
      // const text = await res.text();
      // console.log('Raw response:', text);
      if (res.ok) {
        alert(data.message || "Welcome");
        navigate('/login');
      } else {
        alert(data.message || "Failed to register, please try again.");
      }
    } catch (err){
      console.error("Error: ", err);
      alert("Network error")
    }
  };

  return(
    <div className="auth-container">
      <h1>Get started on lawyery</h1>
      <p>We're excited to have you join us</p>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>Upload an image:</label>
        {/*TODO: Implement a check in backend since 'accept' just suggests the browser what filetype is valid*/}
        <input 
          name="user-photo" 
          onChange={handleImgChange}
          type="file" accept="image/png, image/jpeg" multiple={false}/>
        {/*preview && <img src={preview} alt="Uploaded image preview"/>*/}
        <img src={preview || userPlaceholderImg} alt="Preview"/>
        <p>Maximum size is 3MB</p>

        <label>First Name</label>
        <input
          name='first-name'
          type="input" maxLength="35" placeholder="John" required/>

        <label>Last Name</label>
        <input
          name='last-name'
          type="input" maxLength="35" placeholder="Doe" required/>

        <label>Email</label>
        <input
          name='email'
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value})}
          type="email" maxLength="35" placeholder="Email" required/>

        <label>Password</label>
        <input
          name='password'
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value})}
          type="password" maxLength="35" placeholder="Password" required/>

          <button type="submit">Submit</button>
      </form>

      <div className="auth-footer">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default Register;
