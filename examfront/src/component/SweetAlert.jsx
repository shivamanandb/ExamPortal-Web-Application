import React from 'react';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles'; // Import for Material UI theme access
import Button from '@mui/material/Button';

const MySwal = Swal.mixin({
  customClass: {
    confirmButton: 'swal-button--confirm', // Optional custom class for styling
    cancelButton: 'swal-button--cancel',   // Optional custom class for styling
  },
});

const SweetAlert = ({
  onDelete,
  title,
  text,
  confirmButtonText = 'Confirm', // Provide default value
  cancelButtonText = 'Cancel',   // Provide default value
  action,
  actionMessage,
}) => {
  const theme = useTheme(); // Access theme for potential button styling

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: theme.palette.primary.main, // Optional styling based on theme
      cancelButtonColor: theme.palette.error.main,   // Optional styling based on theme
    });

    if (result.isConfirmed) {
      onDelete();
      await MySwal.fire(action, actionMessage, 'success');
    }
  };

  return (
    <Button  color="secondary" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default SweetAlert;
