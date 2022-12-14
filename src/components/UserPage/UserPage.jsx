import React from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import PetItem from '../PetItem/PetItem.jsx';
import Nav from '../Nav/Nav.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
          <br />
          <Grid item>
            <Fab color="orange" variant="extended" onClick={handleClick}>
              <AddIcon sx={{ mr: 1}} />
              Add Pet
            </Fab>
          </Grid>
          <br />
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
      </Grid>
    </div>
  );
}

export default UserPage;
