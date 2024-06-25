import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Dashboard from './Dashboard';

export default function Registration() {
    // const [dob, setDob] = useState('');
    const [userdata, setUserdata] = useState({
        name:'',
        email:'',
        password:'',
        dob:'',
        username:''
    })
   
    const handleChange = (name) => (event) => {
        setUserdata({...userdata, [name] : event.target.value})
        // console.log({...userdata, [name] : event.target.value});
    }

    const sumitHandler = async (e) => {
      e.preventDefault();
      console.log("Userdata:", userdata); 
        try {
            const response = await axios.post('http://localhost:8989/api/v1/register', userdata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            console.log('Registration successful');
            if (response.data.token) {
              navigate("/dashboard"); // Navigate to dashboard on successful registration
          }
        } catch (error) {
            console.error('Error registering:', error.message);
           
        }
    }
    const navigate = useNavigate();
  return (
    <div className='d-flex flex-col justify-content-center align-items-center bg-primary vh-100 vw-100'>
      <div className='bg-dark p-3 rounded w-25 h-75 d-flex justify-content-center align-items-center'>
        <form  type='submit'  className="w-100" onSubmit={sumitHandler}>
          <div className='text-light mb-3'>
            <h3>Sign-up</h3>
          </div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}>
              <img src='https://circumicons.com/icon/user' alt="User" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              name='name'
              onChange={handleChange('name')}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" style={{ fontSize: '20px' }}>
              <img src='https://circumicons.com/icon/mail' alt="User" />
            </InputGroup.Text>
            <Form.Control
              placeholder="email"
              aria-label="Name"
              aria-describedby="basic-addon1"
              name='email'
              onChange={handleChange('email')}
            />
          </InputGroup>
          <InputGroup className="mb-3 bg-light rounded">
            <InputGroup.Text id="basic-addon2" style={{ fontSize: '20px'}}>
              <img src='https://circumicons.com/icon/calendar' alt="Calendar" />
            <DatePicker 
              onChange={date => setUserdata({...userdata, dob:date})}
              selected={userdata.dob}
              dateFormat="dd/MM/yyyy"
              placeholderText="DOB"
              className="form-control text-dark "
              name='dob'
            //   onSelect={(date) => handleChange('dob', date)}
            />
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3" style={{ fontSize: '20px' }}>@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon3"
              name='username'
              onChange={handleChange('username')}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon4">
              <img src='https://circumicons.com/icon/lock' style={{ width: '90%', height: '25px' }} alt="Lock" />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon4"
              name='password'
              onChange={handleChange('password')}
            />
          </InputGroup>
          <div className="row mb-3">
            <div className="col d-flex justify-content-start align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                <label className="form-check-label text-light" htmlFor="form2Example31">Remember me</label>
              </div>
            </div>
            <div className="col text-end">
              <a href="#!" className="text-light">Forgot password?</a>
            </div>
          </div>
         
          <button  type='submit'  className="btn btn-success btn-block w-100">
                Register
            </button>
      

    <br/>
    <br/>
    
          <NavLink to='/'>
          <button  className="btn btn-success btn-block w-100">Login</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}
