import React from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import PetItem from '../PetItem/PetItem.jsx';
import Nav from '../Nav/Nav.jsx';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UserPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user);
  const userPets = useSelector(store => store.pet.userPets);

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
      }
    }
  });

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
            <ThemeProvider theme={colorTheme}>
              <Button onClick={handleClick} variant="contained" color="orange" size="large">ADD PET</Button>
            </ThemeProvider>
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

// this allows us to use <App /> in index.js
export default UserPage;
