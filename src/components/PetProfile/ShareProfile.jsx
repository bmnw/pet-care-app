import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Typography from '@mui/material/Typography';
import Textfield from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ShareProfile  = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();
    const [username, setUsername] = useState('');
    const pet = useSelector(store => store.pet.petDetails);
    const existingUsernames = useSelector(store => store.share.allUsernames);
    let shareWithId = '';

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

    // variable and functions for dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
        setUsername('');
    }

    useEffect(() => {
        console.log('share profile pet id:', petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_ALL_USERNAMES'});
    }, []);

    const shareProfile = (usernameInput) => {
        console.log('in shareProfile:', usernameInput);
        if(usernameMatch(existingUsernames, usernameInput)){
            console.log('entered username has a match in the DB');
            dispatch({type: 'SHARE_PROFILE', payload: {user_id: shareWithId, pet_id: petid}, shareSuccess: shareSuccess});
        } else {
            console.log("The username you enter must already have a Waffle's Spot account. Please double check spelling and capitalization!")
        }
    } // end shareProfile

    const shareSuccess = () => {
        console.log('this pet profile was shared successfully');
        handleClickOpen();
        // setUsername('');
    } // end shareSuccess

    const usernameMatch = (usernameArray, usernameInput) => {
        console.log('in usernameMatch', usernameArray, usernameInput);
        for(let username of usernameArray) {
            if(usernameInput === username.username) {
                console.log(true, username.id);
                shareWithId = username.id;
                return true;
            }
        }
    } // end usernameMatch

    return  <>
                <Nav/>
                {
                    pet.map(detail => {
                        return  <div key={detail.id}>
                                    <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                        <Typography variant="h5">Share {detail.pet_name}'s profile!</Typography>
                                    </Box>
                                    <br />
                                    <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                        <img src={detail.image} style={{width: 125, height: 100, border: 'solid'}} />
                                    </Box>
                                </div>
                    })
                }
                <br />
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Typography variant="h6">Who do you want to share with?</Typography>
                </Box>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Typography>They will be able to view and edit this pet's profile.</Typography>
                </Box>
                <br />
                <br />
                <br />
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Textfield 
                        sx={{backgroundColor: 'white', width: 300}}
                        required
                        label="Username to share with"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Box>
                <br />
                <br />
                <Box sx={{display:"flex", justifyContent:"space-evenly"}}>
                    <ThemeProvider theme={colorTheme}>
                        <Button 
                            color="blue" size="large" variant="contained" sx={{width: 130, height: 45}} onClick={() => history.push(`/petprofile/${petid}`)}>
                            CANCEL
                        </Button>
                        <Button 
                            color="orange" size="large" variant="contained" sx={{width: 130, height: 45}} onClick={() => shareProfile(username)}>
                            SHARE
                        </Button>
                    </ThemeProvider>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    fullWidth
                >
                    <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
                        {
                            pet.map(detail => {
                                return  <>
                                            You have shared {detail.pet_name}'s profile with {username}!
                                        </>
                            })
                        }
                    </DialogTitle>
                    <DialogContent>
                        {"They now have full access to the profile information and actions."}
                    </DialogContent>
                </Dialog>   
            </>
}

export default ShareProfile;