import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import star from "../../assets/star.png";
import './HomePage.css';


export default function HomePage() {
    const { id } = useParams();
    const nav = useNavigate()

    const [user, setUser] = useState({});
    const [accomplishments, setAccomplishments] = useState([]);

    const [newAccomplishment, setNewAccomplishment] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [newCompleted, setNewCompleted] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/api/user/${id}/accomplishments`, {
                accomplishment: newAccomplishment,
                notes: newNotes.split(",").map(n => n.trim()),
                completed: newCompleted
            });

            setAccomplishments(prev => [response.data, ...prev]);

            setNewAccomplishment("");
            setNewNotes("");
            setNewCompleted(false);

            alert("Congraulations! On Your New Accomplishment")

        } catch (error) {
            console.error(error.message);
            alert("Failed to create new accomplishment")
        }
    }

    if (!id) {
        return (
            <div className="homepageNoId">
                <h1>Welcome to Accomplishment Tracker</h1>
                <button onClick={() => nav("/signingin")}>Sign In</button>
            </div>
        );
    }

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

    const handleChange = (accomplishmentId, field, value) => {
        setAccomplishments(a =>
            a.map(el =>
                el._id === accomplishmentId
                    ? { ...el, [field]: value }
                    : el

            )
        );
    };

    const handleSave = async (e, accomplishmentId) => {
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
        <div className="accomplishmentContainer">
            <header className="accomplishmentHeader">
                <h1>Welcome</h1>
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <h2>{`${user.username}'s Accomplishment`}</h2>

                <div className="navbarIcon">
                    <img src={star} alt="icon" />
                </div>


                <div className="formWrapper">
                    <h4>Create A New Accomplishment</h4>
                    <form className="createForm" onSubmit={handleCreate}>
                        <label>
                            Accomplishment:
                            <input
                                type="text"
                                value={newAccomplishment}
                                onChange={e => setNewAccomplishment(e.target.value)} placeholder="New Accomplishment"
                                required
                            /></label>

                        <label>
                            Notes:
                            <input
                                type="text"
                                value={newNotes}
                                onChange={e => setNewNotes(e.target.value)}
                                placeholder="Notes (Comma Sepaprated)"
                            />
                        </label>

                        <label>
                            Completed:
                            <input
                                type="checkbox"
                                checked={newCompleted}
                                onChange={e => setNewCompleted(e.target.checked)}
                            />
                        </label>

                        <p>Completed: {newCompleted ? "Yes" : "No"}</p>
                        <br />
                        <button type="submit">Create</button>
                    </form>
                </div>


            </header>

            <div>
                {accomplishments.map((a, index) => (
                    <div key={index} className="accomplishmentCard">

                        {a.isEditing ? (
                            <form className="editForm" onSubmit={e => handleSave(e, a._id)}>
                                <input type="text"
                                    value={a.editAccomplishment}
                                    onChange={e => handleChange(a._id, 'editAccomplishment', e.target.value)}
                                    placeholder="Accomplishment ..."
                                    required />

                                <input type="text"
                                    value={a.editNotes}
                                    onChange={e => handleChange(a._id, 'editNotes', e.target.value)}
                                    placeholder="Notes ..."
                                />

                                <label>
                                    Completed:
                                    <input type="checkbox"
                                        checked={a.editCompleted}
                                        onChange={e => handleChange(a._id, 'editCompleted', e.target.checked)}
                                    />
                                </label>

                                <div className="cardButtons">
                                    <button type="submit">SAVE</button>
                                </div>
                            </form>
                        ) : (
                            <>
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
                                    <button className="editButton" onClick={() => startEdit(a._id)}>Edit</button>
                                    <button className="deleteButton" onClick={() => handleDelete(a._id)}>Delete</button>
                                </div>
                            </>
                        )}

                    </div>
                ))}
            </div>
        </div>

    )
}



