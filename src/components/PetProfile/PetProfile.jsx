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

const PetProfile = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);

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
                        <Grid item>
                            <Button className="profile-menu-btn" variant="contained" size="large">CARE REMINDERS</Button>
                        </Grid>
                        <Grid item>
                            <Button className="profile-menu-btn" variant="contained" size="large">VET NOTES</Button>
                        </Grid>
                        <Grid item>
                            <Button className="profile-menu-btn" variant="contained" size="large">ADD CARE/EDIT</Button>
                        </Grid>
                        <Grid item>
                            <Button color="secondary" className="profile-back-btn" variant="contained" size="large">ALL PETS</Button>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <Grid 
                        container
                        spacing={2}
                        direction="row"
                        alignItems="right"
                        justifyContent="right"
                    >
                        <Grid item>
                            <RemoveProfileButton />
                        </Grid>
                    </Grid>
                </Container>
            </div>
}

export default PetProfile;