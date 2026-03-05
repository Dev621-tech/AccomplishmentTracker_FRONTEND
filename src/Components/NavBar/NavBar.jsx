import { Link } from "react-router";
import "./NavBar.css";
import star from "../../assets/star.png";

export default function NavBar() {

    return (
        <>
            <header className="navbar">
                <Link to={"/"}>
                    <h1 className="navbarTitle">Accomplishment Tracker</h1>
                </Link>
                <div className="navbarButtons">
                    <nav className="navbarUserButtons">
                        <Link to={""}><button>HomePage</button></Link>
                        <Link to={""}><button>Post</button></Link>
                        <Link to={""}><button>Inspiration</button></Link>
                    </nav>

                    <div className="navbarIcon">
                        <img src={star} alt="icon" />
                    </div>

                    <nav className="navbarAuthButtons">
                        <Link to={""}><button>About</button></Link>
                        <Link to={"/signingin"}><button>Sign In</button></Link>
                        <Link to={"/newuser"}><button>Sign Up</button></Link>
                    </nav>
                </div>

            </header>

        </>
    )
}