import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Notification = ({ open, message, severity, onClose }) => (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);

export default Notification;
