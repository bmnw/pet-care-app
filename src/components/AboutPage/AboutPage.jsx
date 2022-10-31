import React from 'react';
import Nav from '../Nav/Nav.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {GoDash} from 'react-icons/go';

function AboutPage() {
  return (
    <div className="container">
      <Nav />
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h5">Waffle's Spot Technologies</Typography>
      </Box>
      <List>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>React</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>Redux-Sagas</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>JavaScript</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>HTML/CSS</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>Material UI</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>React Icons</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>Express</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>Node.js</ListItemText>
        </ListItem>
        <ListItem>
          <GoDash fontSize="large" />
          <ListItemText primaryTypographyProps={{fontSize: 18, marginLeft: 2}}>PostgreSQL</ListItemText>
        </ListItem>

      </List>

    </div>
  );
}

export default AboutPage;
