import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditPopup from './EditPopup';
import AddPopup from './AddPopup';

export default function Orders() {
  const [contracts, setContracts] = useState([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);
  };

  const handleOpenEditPopup = (contract) => {
    setSelectedContract(contract);
    setOpenEditPopup(true);
  };

  const handleClosePopup = () => {
    setOpenAddPopup(false);
    setOpenEditPopup(false);
  };

  useEffect(() => {
    getContracts();
  }, []);

  const handleSave = (editedContract) => {
    // Perform the save operation using editedContract data
    console.log(editedContract);
    handleClosePopup();
  };

  async function getContracts() {
    try {
      const response = await axios.get('http://localhost/mycontracts/contracts/');
      console.log(response.data);

      const currentDate = new Date();

      const updatedContracts = response.data.map((contract) => {
        const expirationDate = new Date(contract.expire_date);

        if (expirationDate < currentDate) {
          // Update the contract status to 3 if the expiration date has passed
          return { ...contract, status: 3 };
        }

        return contract;
      });

      setContracts(updatedContracts);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(contractId) {
    try {
      await axios.delete(`http://localhost/mycontracts/contracts/${contractId}`);

      // After successful deletion, update the contracts state to reflect the changes
      setContracts((prevContracts) =>
        prevContracts.filter((contract) => contract.id !== contractId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStatusUpdate(contractId, newStatus) {
    console.log("Contract ID:", contractId); // Add this line
    console.log("New Status:", newStatus);
    try {
      const response = await axios.put(
        `http://localhost/mycontracts/contracts/${contractId}?contractId=${contractId}`,
        { status: newStatus }
      );

      console.log(response.data);
      await getContracts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1' }}>Recent Contracts</div>
          <Button
            variant="contained"
            style={{ backgroundColor: 'green', marginLeft: '10px' }}
            onClick={handleOpenAddPopup}
          >
            Add Contract
          </Button>
        </div>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Expire Date</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Employee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell >Cost</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.user_name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.start_date}</TableCell>
              <TableCell>{row.expire_date}</TableCell>
              <TableCell>{row.service_name}</TableCell>
              <TableCell>{row.employee_name}</TableCell>
              <TableCell>
                {row.status === 0 && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusUpdate(row.id, 1)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleStatusUpdate(row.id, 2)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {row.status === 1 ? 'Approved' : ''}
                {row.status === 2 ? 'Rejected' : ''}
                {row.status === 3 ? 'Expired' : ''}
              </TableCell>
              <TableCell>{row.total_cost}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleOpenEditPopup(row)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openEditPopup && (
        <EditPopup
          open={openEditPopup}
          handleClose={handleClosePopup}
          contract={selectedContract}
          handleSave={handleSave}
        />
      )}
      {openAddPopup && (
        <AddPopup
          open={openAddPopup}
          handleClose={handleClosePopup}
          handleAdd={handleSave}
        />
      )}
    </React.Fragment>
  );
}
