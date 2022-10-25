import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import './PetProfile.css';



const RemoveProfileButton = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

    const colorTheme = createTheme({
        palette: {
          orange: {
            main: '#E27511',
          },
          white: {
            main: '#F9F5F0',
          },
          blue: {
            main: '#3D85C6',
            contrastText: '#F9F5F0'
          }
        }
      });

    const removeProfile = (inputId) => {
        console.log('in removeProfile', petid);
        dispatch({type: 'DELETE_PET_PROFILE', payload: inputId, toDashboard: toDashboard});
    } // end removeProfile

    const toDashboard = () => {
        console.log('in toDashboard');
        history.push('/user');
    }

    // dialog feature variables and functions
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    return  <>
                <ThemeProvider theme={colorTheme}>
                    <Button 
                        onClick={handleClickOpen} 
                        className="remove-profile-btn" 
                        variant="contained" 
                        size="small"
                        color="white"
                        >
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
                            <Button onClick={handleClickClose} variant="contained" color="orange">No</Button>
                            <Button onClick={() => removeProfile(petid)} color="blue">Yes</Button>
                        </DialogActions>
                    </Dialog>
                </ThemeProvider>
                {/* <Button 
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
                </Dialog> */}
            </>
}

export default RemoveProfileButton;