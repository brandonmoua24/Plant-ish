import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './Registration.css';

const REGISTER_URL = 'http://localhost:8008/api/user';

const Registration = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(REGISTER_URL, {
                username,
                password,
                confirmpassword: confirmPassword,  
            });

            console.warn(result.data);

            if (result.data.msg === 'User added successfully') {
                alert("Data saved successfully");
                setUserName("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="registration-container">
            <div className='title'>Sign Up:</div>
            <form onSubmit={handleOnSubmit}>
                <label>Username </label>
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                <label>Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Confirm Password </label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <p>
                Already registered? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
}

export default Registration;
