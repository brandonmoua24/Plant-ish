import { useRef, useState, useEffect, useContext } from 'react';
import { AuthProvider, useAuth } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';

import axios from 'axios';
const LOGIN_URL = 'http://localhost:8008/api/user/login';

const LogIn = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            LOGIN_URL,
            { username: user, password: pwd },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );

        console.log(response.data);

        const accessToken = response?.data?.accessToken;

        if (!accessToken) {
            console.error('No access token received');
            return;
        }

        setAuth({ user, pwd, accessToken });

        setUser('');
        setPwd('');
        navigate('/userhomepage');
    } catch (err) {
        console.error(err);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Incorrect Username or Password');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
};

    return (
            <container>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className='title'>LOGIN</div>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Username </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    </div>
                    <br/>
                    <div>
                    <label>Password </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    </div>
                    <br/>
                    <button className='button'>Sign In</button>
                </form>
            <p>
                Need an Account? <Link to="/registration">Sign Up</Link>
            </p>
            </container>
    )
}

export default LogIn;
