import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './CreateAccountPage.css';

export default function CreateAccountPage() {
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/user", formData);

            console.log("User created:", response.data);
            alert("Account created successfully!");

            const userId = response.data._id;
            localStorage.setItem("userId", userId);
            nav(`/user/${userId}/accomplishments`);

        } catch (error) {
            console.log(error.message);
            alert("Failed to create your account.")
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="createAccountContainer">
                <fieldset>
                    <legend>Create A New Account</legend>
                    <form onSubmit={handleSubmit}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br />
                        <input type="submit" value="CREATE NEW USER" />
                    </form>
                </fieldset>
            </div>
        </>
    )
}




//   {
//     firstName: "Nigel",
//     lastName: "Uno",
//     username: "NumberOne1",
//     email: "codenamekidsnextdoor@test.com",
//     password: "whatwhat11"
//   },