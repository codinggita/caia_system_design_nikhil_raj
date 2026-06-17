import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box
} from '@mui/material';
import { Block, CheckCircle } from '@mui/icons-material';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleBanToggle = async (id, isBanned) => {
    try {
        const action = isBanned ? 'unban' : 'ban';
        await api.patch(`/admin/users/${id}/${action}`);
        toast.success(`User ${action}ned successfully`);
        fetchUsers();
      } catch {
        toast.error('Failed to update user status');
      }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} size="small" color={user.role === 'admin' ? 'secondary' : 'default'} />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.isBanned ? 'Banned' : 'Active'} 
                    size="small" 
                    color={user.isBanned ? 'error' : 'success'} 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleBanToggle(user._id, user.isBanned)}>
                    {user.isBanned ? <CheckCircleIcon color="success" /> : <BlockIcon color="error" />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
