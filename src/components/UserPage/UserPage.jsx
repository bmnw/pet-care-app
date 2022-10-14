import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import PetItem from '../PetItem/PetItem.jsx';
import Nav from '../Nav/Nav.jsx';
import Grid from '@mui/material/Grid';

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
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
        {/* <LogOutButton className="btn" /> */}
        {
          petList.map(pet => {
            return (
                <Grid>
                  <PetItem 
                    pet={pet}
                  />
                </Grid>
            )
          })
        }
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
