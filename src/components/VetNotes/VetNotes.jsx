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

const VetNotes = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const vetNotes = useSelector(store => store.vet.vetNotes);

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
                <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button 
                        sx={{marginRight: 1, width: 150}} 
                        variant="contained" 
                        size="large" 
                        color="white" 
                        onClick={(event) => history.push(`/petprofile/${petid}`)}
                    >
                        PET PROFILE
                    </Button>
                    <Fab 
                        variant="extended" 
                        color="orange" 
                        onClick={(event) => history.push(`/add-vet-note/${petid}`)}
                    >
                        <AddIcon sx={{ mr: 1 }}/>
                        New Note
                    </Fab>
                </Box>
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