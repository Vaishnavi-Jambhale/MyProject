import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (name) => (e) => {
        setLoginData({ ...loginData, [name]: e.target.value });
    };

    const navigate = useNavigate();

    const sumitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8989/api/v1/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            console.log('Login successful');
            if (response.data.token) {
                navigate("/dashboard"); // Navigate to dashboard on successful login
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='d-flex flex-col justify-content-center align-items-center bg-primary vh-100 vw-100'>
            <div className='bg-dark p-3 rounded w-25 h-50 d-flex justify-content-center align-items-center'>
                <form onSubmit={sumitHandler}>
                    <div className='text-light' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: '50px' }}>
                        <h3>Sign-in</h3>
                    </div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}>
                            <img src='https://circumicons.com/icon/mail' alt="User" />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="email"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            name='email'
                            onChange={changeHandler('email')}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><img src='https://circumicons.com/icon/lock' style={{ width: '90%', height: '25px' }} alt="Lock" /></InputGroup.Text>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            onChange={changeHandler('password')}
                        />
                    </InputGroup>
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                <label className="form-check-label text-light" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>
                        <div className="col">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
                    <br />
                    <NavLink to='/signup'>
                        <button type="button" className="btn btn-primary btn-block mb-4 w-100">Register</button>
                    </NavLink>
                </form>
            </div>
        </div>
    );
}
