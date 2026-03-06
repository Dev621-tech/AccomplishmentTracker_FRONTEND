import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";
import './LogInPage.css';


export default function LogInPage() {
    const [ username, setUsername ] = useState("");
    const [ passsword, setPassword ] = useState("");
    const nav = useNavigate();

    

    return (
        <>
            <div className="loginContainer">
                <fieldset>
                    <legend>Log Into Your Account</legend>
                    <form>
                        <label>
                            Username:
                            <input type="text" name="username" placeholder="Enter Username" required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" placeholder="Enter Password" required />
                        </label>
                        <br />
                        <input type="submit" value="LOG IN" />

                    </form>
                </fieldset>
            </div>

        </>
    )
}