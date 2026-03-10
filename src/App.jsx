import './App.css';
import { Routes, Route } from "react-router";
import NavBar from "./Components/NavBar/NavBar.jsx";
import CreateAccountPage from "./Pages/CreateAccountPage/CreateAccountPage.jsx";
import LogInPage from "./Pages/LogInPage/LogInPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import InspirationPage from './Pages/InspirationPage/InspirationPage.jsx';
import AboutPage from './Pages/AboutPage/AboutPage.jsx';
import PostPage from './Pages/PostPage/PostPage.jsx';
import ProfilePage from './Pages/ProfilePage/ProfilePage.jsx';

function App() {


  return (
    <>
   
    <NavBar />
    <Routes>
      <Route path={"/newuser"} element={<CreateAccountPage />} />
      <Route path={"/signingin"} element={<LogInPage />} />
      <Route path={"/user/accomplishments"} element={<HomePage />} />
      <Route path={"/user/:id/accomplishments"} element={<HomePage />} />
      <Route path={"/user/posts"} element={<PostPage />} />
      <Route path={"/user/:id/posts"} element={<PostPage />} />
      <Route path={"/inspiration"} element={<InspirationPage />} />
      <Route path={"/about"} element={<AboutPage />} />
      <Route path={"/user/:id/profile"} element={<ProfilePage />} />

    </Routes>
 
    </>
  )
}

export default App
