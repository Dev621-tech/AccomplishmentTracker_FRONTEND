import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import './HomePage.css';

export default function HomePage() {
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [accomplishments, setAccomplishments] = useState([]);

    useEffect(() => {
        const getAccomplishments = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/api/user/${id}`)
                setUser(userResponse.data);

                const response = await axios.get(`http://localhost:3000/api/user/${id}/accomplishments`)
                setAccomplishments(response.data);
                console.log(response.data);

            } catch (error) {
                console.error(error.message)
            }
        };
        getAccomplishments();
    }, [id]);


    return (
        <>
            <div className="accomplishmentContainer">
                <header className="accomplishmentHeader">
                    <h1>{`Welcome, ${user.firstName} ${user.lastName}`}</h1>
                    <h2>{`${user.username}'s Accomplishment`}</h2>
                </header>

                <div>
                    {accomplishments.map((a, index) => (
                        <div key={index} className="accomplishmentCard">

                            <div className="accomplismentName">
                                <h3>{a.accomplishment}</h3>
                            </div>

                            {a.notes && (
                                <ul>
                                    {a.notes.map((note, idx) => (
                                        <li key={idx}> {note} </li>
                                    ))}
                                </ul>
                            )}

                            <div className="cardStatus">
                                <span className={` status ${a.completed ? 'completed' : 'uncompleted'} `}>
                                    {a.completed ? 'ACCOMPLISHED' : 'UNACCOMPLISHED'}
                                </span>
                            </div>

                            <div className="cardButtons">
                                <button className="editButton" onClick={() => handleEdit(a._id)}>Edit</button>
                                <button className="deleteButton" onClick={() => handleDelete(a._id)}>Delete</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}