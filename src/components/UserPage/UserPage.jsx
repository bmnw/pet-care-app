import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import PetItem from '../PetItem/PetItem.jsx';
import Nav from '../Nav/Nav.jsx';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = (userID) => {
    console.log('in fetchPets');
    axios.get('/api/pet')
      .then((response) => {
        setPetList(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong. Sorry!');
      });
  }

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
          {/* <p>Your ID is: {user.id}</p> */}
          {/* <LogOutButton className="btn" /> */}
          {
            petList.map(pet => {
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
            <Button variant="contained">ADD PET</Button>
          </Grid>
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
