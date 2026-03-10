import './App.css';
import { Routes, Route } from "react-router";
import NavBar from "./Components/NavBar/NavBar.jsx";
import CreateAccountPage from "./Pages/CreateAccountPage/CreateAccountPage.jsx";
import LogInPage from "./Pages/LogInPage/LogInPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import InspirationPage from './Pages/InspirationPage/InspirationPage.jsx';
import AboutPage from './Pages/AboutPage/AboutPage.jsx';

function App() {


  return (
    <>
   
    <NavBar />
    <Routes>
      <Route path={"/newuser"} element={<CreateAccountPage />} />
      <Route path={"/signingin"} element={<LogInPage />} />
      <Route path={"/user/accomplishments"} element={<HomePage />} />
      <Route path={"/user/:id/accomplishments"} element={<HomePage />} />
      <Route path={"/inspiration"} element={<InspirationPage />} />
      <Route path={"/about"} element={<AboutPage />} />
    </Routes>
 
    </>
  )
}

export default App
