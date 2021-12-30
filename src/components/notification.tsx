import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

type Props = {
    open: boolean,
    message: string,
    severity: AlertColor,
    onClose: () => void,
}

const Notification = ({ open, message, severity = 'info', onClose }: Props) => (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);

export default Notification;
