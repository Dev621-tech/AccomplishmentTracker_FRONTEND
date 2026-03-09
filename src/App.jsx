import './App.css';
import { Routes, Route } from "react-router";
import NavBar from "./Components/NavBar/NavBar.jsx";
import CreateAccountPage from "./Pages/CreateAccountPage.jsx";
import LogInPage from "./Pages/LogInPage/LogInPage.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";

function App() {


  return (
    <>
   
    <NavBar />
    <Routes>
      <Route path={"/newuser"} element={<CreateAccountPage />} />
      <Route path={"/signingin"} element={<LogInPage />} />
      <Route path={"/user/accomplishments"} element={<HomePage />} />
      <Route path={"/user/:id/accomplishments"} element={<HomePage />} />
    </Routes>
 
    </>
  )
}

export default App
