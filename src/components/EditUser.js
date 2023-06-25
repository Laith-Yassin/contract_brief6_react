import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function EditUser({ userId, onClose, onUpdateUser }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get(`http://localhost/users-api/user/${userId}`);
      const { id, name, email, password, phone } = response.data;
      setInputs((prevInputs) => ({
        ...prevInputs,
        id: id || "",
        name: name || "",
        email: email || "",
        password: password || "",
        phone: phone || ""
      }));
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost/users-api/user/${userId}/edit`, inputs).then(function (response) {
      console.log(response.data);
      setOpen(false);
      onClose();
      onUpdateUser(); // Trigger the callback function to update the user list
    });
  };

  const stopEditing = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={stopEditing}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1em' }}>
            <TextField type="text" name="name" label="Name" value={inputs.name} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '1em' }}>
            <TextField type="email" name="email" label="Email" value={inputs.email} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '1em' }}>
            <TextField  type="number" name="phone" label="Phone" value={inputs.phone} onChange={handleChange} />
            </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={stopEditing}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUser;
