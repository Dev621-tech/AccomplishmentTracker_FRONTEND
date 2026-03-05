import './App.css';
import { Routes, Route } from "react-router";
import NavBar from "./Components/NavBar/NavBar.jsx";
import CreateAccountPage from "./Pages/CreateAccountPage.jsx";
import LogInPage from "./Pages/LogInPage.jsx";


function App() {


  return (
    <>
   
    <NavBar />
    <Routes>
      <Route path={"/newuser"} element={<CreateAccountPage />} />
      <Route path={"/signingin"} element={<LogInPage />} />
    </Routes>
 
    </>
  )
}

export default App
