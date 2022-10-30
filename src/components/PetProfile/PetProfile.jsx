import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import RemoveProfileButton from './RemoveProfileButton.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import EditIcon from '@mui/icons-material/Edit';
import './PetProfile.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PetProfile = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

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
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
    }, []);


    return  <div>
                <Nav />
                <Container>
                {
                    pet.map(pet => {
                        return  (
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                        justifyContent="center"
                                        key={pet.id}
                                    >
                                        <Grid item>
                                            <img src={pet.image} style={{width: 125, height: 100, border: 'solid'}} />
                                        </Grid>
                                        <Grid item
                                            sx={{display:"flex", alignItems:"center", justifyContent:"center"}}
                                        >
                                            <Typography variant="h5">{pet.pet_name}!</Typography>
                                        </Grid>
                                    </Grid>
                                )
                    })
                }
                <br />
                    <Grid 
                        container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ThemeProvider theme={colorTheme}>
                            <Grid item>
                                <Button startIcon={<NotificationsActiveRoundedIcon />} onClick={() => history.push(`/reminders/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">CARE REMINDERS</Button>
                            </Grid>
                            <Grid item>
                                <Button startIcon={<PetsRoundedIcon/>} onClick={() => history.push(`/vet-notes/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">VET NOTES</Button>
                            </Grid>
                            <Grid item>
                                <Button startIcon={<EditIcon/>} onClick={() => history.push(`/add-edit/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">ADD CARE/EDIT</Button>
                            </Grid>
                            <ThemeProvider theme={colorTheme}>
                            <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Fab color="orange" variant="extended" onClick={() => history.push(`/share-profile/${petid}`)}>
                                    <IosShareRoundedIcon sx={{ mr: 1 }}/>
                                    Share
                                </Fab>
                                {/* <Button 
                                    color="orange" size="large" variant="contained" sx={{width: 130, height: 45}} onClick={() => history.push(`/share-profile/${petid}`)}>
                                    <IosShareRoundedIcon />
                                    Share
                                </Button> */}
                            </Grid>
                            </ThemeProvider>
                            {/* <Grid item>
                                <Button onClick={() => history.push('/user')} className="profile-back-btn" variant="contained" size="large" color="orange">ALL PETS</Button>
                            </Grid> */}
                        </ThemeProvider>
                 
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid 
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="space-evenly"
                    >
                        <ThemeProvider theme={colorTheme}>
                            <Grid item>
                                <Button onClick={() => history.push('/user')} sx={{width: 130}} variant="contained" size="large" color="orange">ALL PETS</Button>
                            </Grid>
                            {/* <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Button 
                                    color="blue" size="large" variant="contained" sx={{width: 130, height: 45}} onClick={() => history.push(`/share-profile/${petid}`)}>
                                    Share
                                </Button>
                            </Grid> */}
                        </ThemeProvider>
                        <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <RemoveProfileButton />
                        </Grid>
                    </Grid>
                </Container>
            </div>
}

export default PetProfile;