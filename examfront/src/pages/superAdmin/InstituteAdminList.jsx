import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAdmins } from '../../services/operations/SuperAdminAPI';
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Avatar,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar
} from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { deleteUser } from '../../services/operations/profileAPI';
import { deleteInstitute } from '../../services/operations/InstituteAPI';

const InstituteAdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAdmins();
  }, [token]);

  useEffect(() => {
    const results = admins.filter(admin =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(results);
  }, [searchTerm, admins]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await getAdmins(token);
      setAdmins(response);
      setFilteredAdmins(response);
    } catch (error) {
      console.error('Error fetching admins', error);
      setSnackbar({ open: true, message: 'Error fetching admins', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteInstitute(adminToDelete.id, token);
      setAdmins(admins.filter(admin => admin.id !== adminToDelete.id));
      setSnackbar({ open: true, message: 'Institute deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting admin', error);
      setSnackbar({ open: true, message: 'Error deleting admin', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setAdminToDelete(null);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="mt-8">
      <Typography variant="h3" component="h1" className="text-center mb-8 text-blue-600 font-bold">
        Institute List
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper} className="shadow-lg">
        <Table aria-label="institute admins table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow 
                key={admin?.id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell>{admin?.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="mr-2 bg-blue-500">
                      {admin.name ? admin.name[0].toUpperCase() : <PersonIcon />}
                    </Avatar>
                    {admin.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={"Active"}
                    color={"success"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(admin)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredAdmins.length === 0 && (
        <Typography variant="body1" className="text-center mt-4 text-gray-500">
          No admins found matching your search.
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the admin: {adminToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InstituteAdminList;