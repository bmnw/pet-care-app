import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const RemoveProfileButton = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const removeProfile = () => {
        console.log('in removeProfile');
        setOpen(true);
    } // end removeProfile

    return  <>
                <Button 
                    onClick={removeProfile} 
                    className="remove-profile-btn" 
                    variant="contained" 
                    size="small">
                        REMOVE PROFILE
                    </Button>
            </>
}

export default RemoveProfileButton;