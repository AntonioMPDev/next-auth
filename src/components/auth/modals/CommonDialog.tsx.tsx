'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';

export default function CommonDialog({
  data: { title, desc },
}: {
  data: {
    title: string;
    desc: string;
  };
}) {
  const { dialog: isDialogOpen, setDialog } = React.useContext(LoginContext);
  const router = useRouter();

  const handleClose = () => {
    setDialog(false);
    router.push('/login');
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
