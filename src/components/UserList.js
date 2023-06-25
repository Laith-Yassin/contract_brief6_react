import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@chakra-ui/layout';
import EditUser from './EditUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost/users-api/users/');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost/users-api/user/${id}/delete`);
      console.log(response.data);
      await getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditUserPopup = (id) => {
    setSelectedUserId(id);
  };

  const closeEditUserPopup = () => {
    setSelectedUserId(null);
  };

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <IconButton
                    className="btn btn-info"
                    style={{ marginRight: '10px' }}
                    onClick={() => openEditUserPopup(user.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton style={{ marginLeft: '10px' }} onClick={() => deleteUser(user.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUserId && (
        <EditUser userId={selectedUserId} onClose={closeEditUserPopup} onUpdateUser={getUsers} />
      )}
    </React.Fragment>
  );
};

export default UserList;
