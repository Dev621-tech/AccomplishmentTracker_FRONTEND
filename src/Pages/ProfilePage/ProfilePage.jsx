import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import './ProfilePage.css';

export default function ProfilePage() {
    const { id } = useParams();

    const [user, setUser] = useState(null);

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
    return (
        <>
            <div className="profileContainer">
                {user ? (
                    <>
                        <h1>{`${user.firstName} ${user.lastName}'s Profile`}</h1>
                        <h2>{`First Name: ${user.firstName}`}</h2>
                        <h2>{`Last Name: ${user.lastName}`}</h2>
                        <h2>{`Username: ${user.username}`}</h2>
                        <h2>{`Email: ${user.email}`}</h2>
                        <h2>{`Password: ${user.password}`}</h2>
                    </>

                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>

    )
}