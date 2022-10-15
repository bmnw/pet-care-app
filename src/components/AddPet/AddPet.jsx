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

    const history = useHistory();
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');

    const submitPet = () => {
        console.log('in submitPet');
        console.log(petName, petType);

    } // end submitPet

    return  <div>
                <Nav />
                <Container>
                    <Typography sx={{textAlign: "center"}} variant="h5">Add a new pet!</Typography>
                    <br />
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                    >
                        <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Typography>PET NAME:</Typography>
                        </Grid>
                        <Grid item>
                            <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={petName}
                                onChange={(event) => setPetName(event.target.value)}    
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
                            <Button onClick={(event) => setPetType('cat')} className="add-pet-btn" size="large" variant="contained">CAT</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={(event) => setPetType('dog')} className="add-pet-btn" size="large" variant="contained">DOG</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={(event) => setPetType('rabbit')} className="add-pet-btn" size="large" variant="contained">RABBIT</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={(event) => setPetType('other')} className="add-pet-btn" size="large" variant="contained">OTHER</Button>
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
                            <Button onClick={() => history.push("/user")} className="add-pet-btn" size="large" variant="contained">CANCEL</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={submitPet} className="add-pet-btn" size="large" variant="contained">ADD PET</Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
} // end AddPet

export default AddPet;