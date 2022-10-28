import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Typography from '@mui/material/Typography';
import Textfield from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ShareProfile  = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();
    const [username, setUsername] = useState('');
    const pet = useSelector(store => store.pet.petDetails);

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

    useEffect(() => {
        console.log('share profile pet id:', petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_ALL_USERNAMES'});
    }, []);

    const shareProfile = (usernameInput) => {
        console.log('in shareProfile:', usernameInput);
    } // end shareProfile

    return  <>
                <Nav/>
                {
                    pet.map(detail => {
                        return  <Box key={detail.id} sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                    <Typography variant="h5">Share {detail.pet_name}'s profile!</Typography>
                                </Box>
                    })
                }
                <br />
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Typography variant="h6">Who do you want to share with?</Typography>
                </Box>
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
            </>
}

export default ShareProfile;