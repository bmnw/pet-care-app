import React from 'react';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="nav">
      <Link to="/home">
        <Grid container spacing={1} direction="row">
          <Grid item sx={{marginBottom: 1}}>
            <img src={'images/logo-cropped-2.jpg'} 
            style={{width: 100, height: 75, border: 'solid'}}
            />
          </Grid>
          <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <h2 className="nav-title">
              Waffle's Spot
            </h2>
          </Grid>
        </Grid> 
        <Grid item className="nav-username">
          {
            user.username ? (`Hey ${user.username}!`) : ('Hey stranger!')
          }
        </Grid>
      </Link>
      <div>
      <br />
      <br />
      <br />
      <br />
      <br />
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="btn" />
          </>
        )}
        {!user.id && (
          // If there's no user, show login/registration links
          <>
            <Button sx={{text: 'white', width: 100}} variant="contained" color="white" className="btn" onClick={() => history.push('/home')}>
              Login
            </Button>
          </>

        )}
      </div>
    </div>
  );
}

export default Nav;
