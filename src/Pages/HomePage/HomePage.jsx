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

    const handleDelete = async (accomplishmentId) => {
        try {
            await axios.delete(`http://localhost:3000/api/accomplishment/${accomplishmentId}`)
            setAccomplishments(a => a.filter(el => el._id !== accomplishmentId));
            alert("Successful Deletion !")
        } catch (error) {
            console.error(error.message);
            alert("Failed to delete accomplishment !");

        }
    }

    const startEdit = (accomplishmentId) => {
        setAccomplishments(a =>
            a.map(el =>
                el._id === accomplishmentId
                    ? {
                        ...el,
                        isEditing: true,
                        editAccomplishment: el.accomplishment,
                        editNotes: el.notes.join(","),
                        editCompleted: el.completed
                    } : el
            )
        )
    };

    const handleChange = ( accomplishmentId, field, value ) => {
        setAccomplishments(a =>
            a.map(el =>
                el._id === accomplishmentId
                    ? { ...el, [field]: value }
                    : el

            )
        );
    };

    const handleSave = async ( e, accomplishmentId ) => {
        e.preventDefault();
        const a = accomplishments.find(el => el._id === accomplishmentId);

        try {
            
            const response = await axios.put(`http://localhost:3000/api/accomplishment/${accomplishmentId}`, {
                accomplishment: a.editAccomplishment,
                notes: a.editNotes.split(",").map(n => n.trim()),
                completed: a.editCompleted
            });

            setAccomplishments(a =>
                a.map(el =>
                    el._id === accomplishmentId ? { ...response.data, isEditing: false } : el
                )
            );

        } catch (error) {
            console.error(error.message);
            alert("Edit Failed ! Try Again !")
        }
    }



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