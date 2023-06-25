import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
const Users = () => {
  return (
    <React.Fragment>
    <Title>Recent Users</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        
       

      </TableBody>
    </Table>
    <Link color="primary" href="#" onClick={event => event.preventDefault()} sx={{ mt: 3 }}>
      See more Users
    </Link>
  </React.Fragment>
  )
}

export default Users
