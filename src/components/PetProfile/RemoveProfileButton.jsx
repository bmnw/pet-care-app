import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    return  <>
                <Button 
                    onClick={handleClickOpen} 
                    className="remove-profile-btn" 
                    variant="contained" 
                    size="small">
                        REMOVE PROFILE
                    </Button>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                >
                    <DialogTitle>
                        {"Remove this pet's profile?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClickClose} variant="contained">No</Button>
                        <Button onClick={() => removeProfile(petid)}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </>
}

export default RemoveProfileButton;