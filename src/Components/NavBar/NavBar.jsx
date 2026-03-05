import { Link } from "react-router";
import "./NavBar.css";

export default function NavBar(){

    return(
        <>
        <header className="navbar">
             <h1 className="navbarTitle">Accomplishment Tracker</h1>
        <nav className="navbarAuthButtons">
            <Link to={"/signingin"}><button>Sign In</button></Link>
            <Link to={"/newuser"}><button>Sign Up</button></Link>
        </nav>
        </header>
       
        </>
    )
}