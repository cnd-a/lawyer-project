import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Splash from "./pages/SplashScreen/SplashScreen.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";

import Home from "./pages/Home/Home.jsx";
import Lawyers from './pages/Lawyers/LawyerList/Lawyers.jsx';
import CreateLawyer from "./pages/Lawyers/CreateLawyer/CreateLawyer.jsx";

import ArticleList from "./pages/Articles/ArticleList/ArticleList.jsx";
import Article from "./pages/Articles/Article/Article.jsx";
import CreateArticle from "./pages/Articles/CreateArticle/CreateArticle.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

// Route config
const routes = [
  { path: "/", element: <Splash /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/lawyers", element: <Lawyers /> },
  { path: "/lawyers/create", element: <CreateLawyer />, protected: true },
  { path: "/articles", element: <ArticleList /> },
  { path: "/articles/:id", element: <Article /> },
  { path: "/articles/create", element: <CreateArticle />, protected: true },
];

// Pages that show header/footer
const withLayout = ["/home", "/lawyers", "/articles"];

const App = () => {
  const location = useLocation();
  const showLayout = withLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showLayout && <Header />}
      <Routes>
        {routes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? <ProtectedRoute element={element} /> : element
            }
          />
        ))}
      </Routes>
      {showLayout && <Footer />}
    </>
  );
};

export default App;
