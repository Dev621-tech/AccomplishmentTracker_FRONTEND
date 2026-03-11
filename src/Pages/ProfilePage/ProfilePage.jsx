import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import './ProfilePage.css';

export default function ProfilePage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [user, setUser] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${id}`);
                console.log(response.data)
                setUser(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        getUser();
    }, []);

    const startEditing = (field) => {
        setEditingField(field);
        setTempValue(user[field]);
    };

    const handleSave = async (field) => {
        try {

            const response = await axios.put(`http://localhost:3000/api/user/${id}`, {
                [field]: tempValue
            });
            setUser(response.data);
            setEditingField(null);
            setTempValue("");

        } catch (error) {
            console.error(error.message);
            alert("Update Failed")
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your entire account?")

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/api/user/${id}`);
            alert("Account Deleted");
            localStorage.removeItem("userId");
            nav("/newuser");

        } catch (error) {
            console.error(error.message);
            alert("Deletion Failed")
        }
    }

    return (
        <>
                <div className="profileContainer">
        {user ? (
            <>
                <h1>{`${user.firstName} ${user.lastName}'s Profile`}</h1>

                {["firstName", "lastName", "username", "email", "password"].map((field) => (
                    <div key={field} className="profileField">
                        {editingField === field ? (
                            <>
                                <input
                                    type={field === "password" ? "password" : "text"}
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                />
                                <button onClick={() => handleSave(field)}>Save</button>
                            </>
                        ) : (
                            <>
                                <h2>{`${field}: ${user[field]}`}</h2>
                                <button className="editButton" onClick={() => startEditing(field)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
                <button className="deleteButton" onClick={handleDelete}>Delete Account</button>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
        </>

    )
}