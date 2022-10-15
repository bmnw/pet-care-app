import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Container from '@mui/material/Container';
import Textfield from '@mui/material/Textfield';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './AddPet.css';
import Nav from '../Nav/Nav.jsx';

const AddPet = () => {
    return  <div>
                <Nav />
                <Container>
                    <Typography sx={{textAlign: "center"}} variant="h5">Add a new pet!</Typography>
                    <br />
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                    >
                        <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Typography>PET NAME:</Typography>
                        </Grid>
                        <Grid item>
                            <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required    
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                    >
                        <Grid item>
                            <Button className="animal-type-btn" size="large" variant="contained">CAT</Button>
                        </Grid>
                        <Grid item>
                            <Button className="animal-type-btn" size="large" variant="contained">DOG</Button>
                        </Grid>
                        <Grid item>
                            <Button className="animal-type-btn" size="large" variant="contained">RABBIT</Button>
                        </Grid>
                        <Grid item>
                            <Button className="animal-type-btn" size="large" variant="contained">OTHER</Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
} // end AddPet

export default AddPet;