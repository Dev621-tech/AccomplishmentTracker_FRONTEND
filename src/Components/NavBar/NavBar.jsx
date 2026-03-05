import { Link } from "react-router";

export default function NavBar(){

    return(
        <>
        <nav>
            <Link to={"/signingin"}><button>Sign In</button></Link>
            <Link to={"/newuser"}><button>Sign Up</button></Link>
        </nav>
        </>
    )
}