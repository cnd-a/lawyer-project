import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Import all pages at once
import Home from "./pages/Home/Home.jsx";
import Login  from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import Splash from "./pages/SplashScreen/SplashScreen.jsx";
import Lawyers from "./pages/Lawyers/Lawyers.jsx";
import CreateLawyer from "./pages/CreateLawyer/CreateLawyer.jsx";
import ArticleList from "./pages/ArticleList/ArticleList.jsx";
import Article from "./components/Article/Article.jsx";

// Route config 
const routes = [
  { path: "/", element: <Splash /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/lawyers", element: <Lawyers /> },
  { path: "/lawyers/create", element: <CreateLawyer /> },
  { path: "/articles", element: <ArticleList /> },
  { path: "/articles/:id", element: <Article /> },
];

// Pages that show header/footer
const withLayout = ["/home", "/lawyers", "/articles"];

function App() {
  const location = useLocation();
  const showLayout = withLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showLayout && <Header />}
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default App;

