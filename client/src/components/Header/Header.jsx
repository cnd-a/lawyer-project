import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-logo">
        <img src="/images/logo1.png" alt="Juristiq logo" />
        <p>JURISTIQ</p>
      </div>

      {/* Middle: Nav */}
      <nav className="header-nav">
        <Link to="/home">Home</Link>
        <Link to="/articles">Articles</Link>
      </nav>

      {/* Right: Auth Buttons */}
      <div className="header-auth">
        <Link to="/register">
        <button className="btn-signup">Sign Up</button>
        </Link>
        <Link to="/login">
        <button className="btn-signin">Sign In</button>
        </Link>
        <Link to="/login">
        <button className="btn-signin" onClick={handleLogout}>Sign Out</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

