import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AddPopup = ({ open, handleClose, handleAdd }) => {
  const [newContract, setNewContract] = useState({
    service_id: '',
    user_id: '',
    start_date: '',
    expire_date: '',
    total_cost: '',
    status: '',
    description: '',
    employee_id: '',
  });
  const [serviceItems, setServiceItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [employeeItems, setEmployeeItems] = useState([]);

  useEffect(() => {
    fetchServiceItems();
    fetchUserItems();
    fetchEmployeeItems();
  }, []);

  const fetchServiceItems = async () => {
    try {
      const response = await axios.get('http://localhost/mycontracts/services.php');
      const services = response.data;
      setServiceItems(services);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserItems = async () => {
    try {
      const response = await axios.get('http://localhost/mycontracts/users.php');
      const users = response.data;
      setUserItems(users);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployeeItems = async () => {
    try {
      const response = await axios.get('http://localhost/mycontracts/employees.php');
      const employees = response.data;
      setEmployeeItems(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContract((prevContract) => ({
      ...prevContract,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send a POST request to add the new contract
      await axios.post('http://localhost/mycontracts/contracts.php', newContract);
  
      // Perform any necessary operations after the save is successful
  
      handleAdd();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  const DisplayEmployees = () => {
    return (
      <div style={{ marginBottom: '1em' }}>
        <FormControl fullWidth>
          <InputLabel>Employee Name</InputLabel>
          <Select
            name="employee_id"
            value={newContract.employee_id}
            onChange={handleChange}
          >
            {employeeItems.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.emplyee_name} {/* Display the employee name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Contract</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '1em', marginTop: '1em' }}>
          <FormControl fullWidth>
            <InputLabel>User Name</InputLabel>
            <Select
              name="user_id"
              value={newContract.user_id}
              onChange={handleChange}
            >
              {userItems.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <DisplayEmployees />

        <div style={{ marginBottom: '1em' }}>
          <TextField
            type="date"
            label="Start Date"
            name="start_date"
            value={newContract.start_date}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <TextField
            type="date"
            label="Expire Date"
            name="expire_date"
            value={newContract.expire_date}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <TextField
            label="Total Cost"
            name="total_cost"
            value={newContract.total_cost}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newContract.status}
              onChange={handleChange}
            >
              <MenuItem value={0}>Waiting</MenuItem>
              <MenuItem value={1}>Approved</MenuItem>
              <MenuItem value={2}>Rejected</MenuItem>
              <MenuItem value={3}>Expired</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: '1em' }}>
          <TextField
            label="Description"
            name="description"
            value={newContract.description}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <FormControl fullWidth>
            <InputLabel>Service</InputLabel>
            <Select
              name="service_id"
              value={newContract.service_id}
              onChange={handleChange}
            >
              {serviceItems.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.service_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPopup;