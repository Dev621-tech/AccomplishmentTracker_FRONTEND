import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";
import './LogInPage.css';


export default function LogInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

            const response = await axios.post(`http://localhost:3000/api/user/login`, {
                username,
                password
            });

            console.log(response.data);

            if (response.data.success){
                nav(response.data.homepage);
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.error(error.message);
            alert(`Login FAILED ! Please Try Again .`)
        }

    }

    return (
        <>
            <div className="loginContainer">
                <fieldset>
                    <legend>Log Into Your Account</legend>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter Username" 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                            required />
                        </label>
                        <br />
                        <input type="submit" value="LOG IN" />

                    </form>
                </fieldset>
            </div>

        </>
    )
}