import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import {AiOutlineInfoCircle} from 'react-icons/ai';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return  <footer>
            <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
              &copy; bmnw
              <Link to="/about">
                <AiOutlineInfoCircle fontSize="30" color="black"/>
              </Link>
            </Box>

          </footer>;
}

export default Footer;
