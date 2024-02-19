import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface AlertMessageProps {
  text: string;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ text, onClose }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success" onClose={onClose}>
        {text}
        <Button color="inherit" size="small" onClick={onClose}>
          Aceptar
        </Button>
      </Alert>
    </Stack>
  );
};

export default AlertMessage;
