import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  // Fetch user data using token
    const token = localStorage.getItem('token');
   
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8989/api/v1/userdata', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error or redirect to login page
        navigate("/");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
    <div className="main_Layout">
      <div className="head_text">
        <h2>Records</h2>
        <p
          onClick={() => {
            localStorage.removeItem('token');
            navigate("/");
          }}
          >
          Logout
        </p>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Sr no</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {records.map((data, id) => {
            return (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td>{data.name}</td>
                <td>{data.dob}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
          </>
  );
}
