import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import VetNoteItem from '../VetNotes/VetNoteItem.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const VetNotes = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const vetNotes = useSelector(store => store.vet.vetNotes);

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
            contrastText: '#F9F5F0'
          }
        }
      });

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_VET_NOTES', payload: petid});
    }, []);

    return  <div>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="h5">Vet Notes for {detail.pet_name}</Typography>
                                </Box>
                    })
                }
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button sx={{marginRight: 1, width: 150}} variant="contained" size="large" color="white" onClick={(event) => history.push(`/petprofile/${petid}`)}>
                            PET PROFILE
                        </Button>
                        {/* <Fab variant="extended" color="white" onClick={(event) => history.push(`/petprofile/${petid}`)}>
                            
                            Pet Profile
                        </Fab> */}
                        {/* <Button sx={{marginLeft: 1, width: 150}} variant="contained" size="large" color="orange" onClick={(event) => history.push(`/add-vet-note/${petid}`)}>
                            NEW NOTE
                        </Button> */}
                        <Fab variant="extended" color="orange" onClick={(event) => history.push(`/add-vet-note/${petid}`)}>
                            <AddIcon sx={{ mr: 1 }}/>
                            New Note
                        </Fab>
                    </Box>
                </ThemeProvider>
             
                <br />
                {
                    vetNotes.map(note => {
                        return  <>
                                    <VetNoteItem 
                                        note={note}
                                        petid={petid}
                                    />
                                </>
                    })
                }
                <br />
            </div>
}

export default VetNotes;