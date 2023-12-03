import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './Registration.css';

const REGISTER_URL = 'http://localhost:8008/api/user';

const Registration = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }

            const result = await axios.post(REGISTER_URL, {
                username,
                password,
                confirmpassword: confirmPassword,  
            });

            console.warn(result.data);

            if (result.data.msg === 'User added successfully') {
                setRegistrationMessage("Registration was successful!");
                setUserName("");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    setRegistrationMessage("");
                }, 2000);
            }
        } catch (error) {
            console.error('Error during registration:', error.message);

            if (error.response && error.response.status === 400) {
                setUsernameError("Username already taken. ");
            } else {
                setUsernameError("Registration failed. Please try again.");
            }
        }
    };

    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
        setUsernameError("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError("");
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError("");
    };

    return (
        <div className="registration-container">
            {registrationMessage && <p className="success">{registrationMessage}</p>}
            {usernameError && <p className="error">{usernameError}</p>}
            {passwordError && <p className="error">{passwordError}</p>}
            <div className='title'>Sign Up:</div>
            <form onSubmit={handleOnSubmit}>
                <label>Username </label>
                <input type="text" value={username} onChange={handleUsernameChange} />
                
                <label>Password </label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                
                <label>Confirm Password </label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                <button type="submit">Register</button>
            </form>
            <p>
                Already registered? <Link to="/login">Log In</Link>
            </p>
        </div>
    );
}

export default Registration;
