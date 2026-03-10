import topthemountain from "../../assets/topthemountain.jpg";
import trophy from "../../assets/trophy.jpg";
import book from "../../assets/book.jpg";
import "./AboutPage.css";

export default function AboutPage() {

    return (
        <>
            <div className="aboutContainer">

                <div className="container">
                    <img src={topthemountain} alt="On Top Of The Mountain" />

                    <div className="textBox">
                        <h2>WHERE IT MAY NOT BE AN ACCOMPLISHMENT TO THEM, BUT IT WAS AN ACCOMPLSIHMENT TO YOU !!</h2>
                    </div>
                </div>

                <div className="container">
                    <div className="textBox">
                        <h2>"SUCCESS IS THE SUM OF SMALL EFFORTS REPEATED DAY IN AND DAY OUT."</h2>
                    </div>

                     <img src={trophy} alt="Trophy" />
                </div>

                <div className="container">
                    <img src={book} alt="Book" />

                    <div className="textBox">
                        <h2>ACCOMPLISH IT & KEEP TRACK</h2>
                    </div>
                </div>

            </div>

        
        </>
    )
}