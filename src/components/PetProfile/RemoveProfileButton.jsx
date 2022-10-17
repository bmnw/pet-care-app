import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PetProfile.css';



const RemoveProfileButton = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

    const removeProfile = (inputId) => {
        console.log('in removeProfile', petid);
        dispatch({type: 'DELETE_PET_PROFILE', payload: inputId, toDashboard: toDashboard});
    } // end removeProfile

    const toDashboard = () => {
        console.log('in toDashboard');
        history.push('/user');
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    return  <>
                <Button 
                    onClick={() => removeProfile(petid)} 
                    className="remove-profile-btn" 
                    variant="contained" 
                    size="small">
                        REMOVE PROFILE
                    </Button>
                    {/* <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography variant="h6" component="h2">
                                Are you sure you want to remove this pet's profile?
                            </Typography>
                            <Button>No, I don't.</Button>
                            <Button>Yes, I'm sure.</Button>
                        </Box>
                    </Modal> */}

            </>
}

export default RemoveProfileButton;