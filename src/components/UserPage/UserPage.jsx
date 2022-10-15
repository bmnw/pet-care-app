import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import PetItem from '../PetItem/PetItem.jsx';
import Nav from '../Nav/Nav.jsx';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function UserPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user);
  const userPets = useSelector(store => store.pet.userPets);

  useEffect(() => {
    dispatch({type: 'FETCH_PETS'});
  }, []);

  const handleClick = () => {
    console.log('in handleClick');
    history.push("/addpet");
  } // end handleClick

  return (
    <div>
      <Nav />
      <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
      >
          <Grid item>
            <Typography variant="h5">Welcome, {user.username}!</Typography>
          </Grid>
          {
            userPets.map(pet => {
              return (
                  <Grid item xs={6} key={pet.id}>
                    <PetItem 
                      pet={pet}
                    />
                  </Grid>
              )
            })
          }
          <br />
          <Grid item>
            <Button onClick={handleClick} variant="contained">ADD PET</Button>
          </Grid>
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
