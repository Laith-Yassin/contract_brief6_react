import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Userprofile.css'; 

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
    getContracts();
  }, []);

  function getUsers() {
    axios
      .get('http://localhost/brief6/users/')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch users');
        setLoading(false);
      });
  }

  function getContracts() {
    axios
      .get('http://localhost/brief6/contracts/')
      .then(response => {
        console.log(response.data);
        setContracts(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch contracts');
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  var userId = parseInt(sessionStorage.getItem("user_id")); // Convert userId to the appropriate data type

  const filteredUsers = users.filter(user => user.id === userId);
  const filteredContracts = contracts.filter(contract => contract.status === 1);

  return (
    <div className="h-100 full-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <MDBContainer fluid className="h-100">
        {filteredUsers.map((user, key) => (
          <MDBRow className="justify-content-center align-items-center h-100" key={key}>
            <MDBCol md="8" lg="6">
            <MDBCard style={{ margin: '50px' }}>
                <MDBCardBody>
                  <MDBCardTitle className="text-center mb-4">User Profile</MDBCardTitle>
                  <MDBCardText>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Name: {user.name}</h5>
                      <MDBBtn outline color="dark">
                        Edit Profile
                      </MDBBtn>
                    </div>
                    <p className="mb-2">Email: {user.email}</p>
                    <p className="mb-2">Phone: {user.phone}</p>
                  </MDBCardText>
                  <h4>Contracts</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>Service</th>
                          <th>User</th>
                          <th>Employee</th>
                          <th>Cost</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {contracts.map((contract, index) => ( */}
                        {filteredContracts.map((contract,index) => (

                          <tr key={index}>
                            <td>{contract.service_name}</td>
                            <td>{user.name}</td>
                            <td>{contract.emplyee_name}</td>
                            <td>{contract.total_cost}</td>
                            <td>{contract.start_date}</td>
                            <td>2023-06-10</td>
                            <td>Completed</td>
                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    </div>
  );
}
