import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <Grid container spacing={1} direction="row">
          <Grid item sx={{marginBottom: 1}}>
            <img src={'images/logo-cropped.jpg'} 
            style={{width: 100, height: 75, border: 'solid'}}
            />
          </Grid>
          <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}><h2 className="nav-title">Waffle's Spot</h2></Grid>
        </Grid> 
        <Grid item sx={{color: 'black'}}>Hey {user.username}!</Grid>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            <Typography>Login / Register</Typography>
          </Link>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

              <LogOutButton className="btn" />
    

          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
