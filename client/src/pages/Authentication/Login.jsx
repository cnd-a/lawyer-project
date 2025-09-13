import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok){
        alert("Welcome to Juristiq");
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else{
        alert(data.message || "Login error");
      }
    } catch (err){
      console.error("Error: ", err);
      alert("Network error")
    }
  };

  return(
    <div className="auth-container">
      <h1>Login Page</h1>
      <p>We're excited to have you join us</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name='email'
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value})}
            type="email" maxLength="35" placeholder="Email" required/>

          <label>Password</label>
          <input
            name='password'
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value})}
            type="password" maxLength="35" placeholder="Password" required/>
          
          <button type="submit">Login</button>
        </form>
        <div className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
