import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import RemoveProfileButton from './RemoveProfileButton.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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
                                <Button onClick={() => history.push(`/reminders/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">CARE REMINDERS</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push(`/vet-notes/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">VET NOTES</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push(`/add-edit/${petid}`)} className="profile-menu-btn" variant="contained" size="large" color="white">ADD CARE/EDIT</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.push('/user')} className="profile-back-btn" variant="contained" size="large" color="orange">ALL PETS</Button>
                            </Grid>
                        </ThemeProvider>
                 
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid 
                        container
                        spacing={2}
                        direction="row"
                        alignItems="right"
                        justifyContent="space-between"
                    >
                        <ThemeProvider theme={colorTheme}>
                            <Grid item>
                                <Button color="blue" size="small" variant="contained" sx={{width: 130}}>
                                    Share
                                </Button>
                            </Grid>
                        </ThemeProvider>
                        <Grid item>
                            <RemoveProfileButton />
                        </Grid>
                    </Grid>
                </Container>
            </div>
}

export default PetProfile;