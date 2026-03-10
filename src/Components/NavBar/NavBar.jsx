import { Link, useNavigate } from "react-router";
import "./NavBar.css";
import star from "../../assets/star.png";

export default function NavBar() {

    const id = localStorage.getItem("userId");
    const nav = useNavigate();

    const handleSignOut = () => {
        
        localStorage.removeItem("userId");

        nav("/signingin");

    }

    return (
        <>
            <header className="navbar">
                <Link to={"/"}>
                    <h1 className="navbarTitle">Accomplishment Tracker</h1>
                </Link>
                <div className="navbarButtons">
                    <nav className="navbarUserButtons">
                        
                        <Link to={id ? `/user/${id}/accomplishments` : `/user/accomplishments`}><button>HomePage</button></Link>
                        <Link to={""}><button>Post</button></Link>
                        <Link to={"/inspiration"}><button>Inspiration</button></Link>
                    </nav>

                    <div className="navbarIcon">
                        <img src={star} alt="icon" />
                    </div>

                    <nav className="navbarAuthButtons">

                       {id && <button onClick={handleSignOut}>Sign Out</button>}
                        <Link to={"/about"}><button>About</button></Link>
                        <Link to={"/signingin"}><button>Sign In</button></Link>
                        <Link to={"/newuser"}><button>Sign Up</button></Link>
                    </nav>
                </div>

            </header>

        </>
    )
}