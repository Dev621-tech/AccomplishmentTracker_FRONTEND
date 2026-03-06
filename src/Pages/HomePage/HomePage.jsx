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
                <h2>{`${user.firstName} ${user.lastName}'s Accomplishments`}</h2>
                <div>
                    {accomplishments.map((a, index) => (
                        <div key={index} className="accomplishmentCard">
                            <h2>{a.accomplishment}</h2>
                            {a.notes && <p>{a.notes}</p>}

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}