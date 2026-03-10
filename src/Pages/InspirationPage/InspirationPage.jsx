import axios from "axios";
import { useState, useEffect } from "react";
import './InspirationPage.css'
import star from "../../assets/star.png"

export default function InspirationPage() {
    const [allAccomplishments, setAllAccomplishment] = useState([]);
    const [allUsers, setAllUser] = useState([]);


    useEffect(() => {
        const getAllAccomplishments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/accomplishment`)

                const responseUsers = await axios.get(`http://localhost:3000/api/user`)

                setAllAccomplishment(response.data);
                setAllUser(responseUsers.data);

            } catch (error) {
                console.log(error.message)
            }
        };
        getAllAccomplishments();
    }, []);

    return (
        <>
            <div className="inspirationHeader">
                <h1>Inspiration Page</h1>

                <div className="inspirationIcon">
                    <img src={star} alt="icon" />
                </div>
            </div>


            <div className="allAccomplishmentContainer">
                {allAccomplishments.map(a => {
                    const user = allUsers.find(u => u._id === a.userId);
                    return (
                        <div key={a._id} className="allAccomplishmentCard">
                            <h2>{user.username}</h2>
                            <h2>{a.accomplishment}</h2>
                            <h3>{a.completed ? "Completed" : "Not Completed"}</h3>
                        </div>
                    )
                })}
            </div>

        </>
    )
}