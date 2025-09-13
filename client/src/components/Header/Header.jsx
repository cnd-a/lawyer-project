import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import userPlaceholderImg from '/src/assets/user-placeholder.jpg';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
  <header className="header">
    <div className="header-left">
      <Link to="/home" className="logo">
        <img src="/images/juristiq.png" alt="Juristiq logo" />
        <p>JURISTIQ</p>
      </Link>
    </div>

    <nav className="header-center nav">
      <Link to="/home">Home</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/lawyers">Lawyers</Link>
    </nav>
   
    <div className="header-right">
    { //Display depending if user is logged in or not
    !loggedIn ? (
      <div className="auth-buttons">
        <Link to="/register"><button className="btn-signup">Sign Up</button></Link>
        <Link to="/login"><button className="btn-signin">Sign In</button></Link>
      </div>
    ) : (
      <div className="auth-buttons">
        <Link to="/login">
          <button className="btn-signout" onClick={handleLogout}>Sign Out</button>
        </Link>
        <div className="user-img">
          <img src={userPlaceholderImg} alt="User profile" />
        </div>
      </div>
    )}
    </div>
  </header>
  );
};

export default Header;

