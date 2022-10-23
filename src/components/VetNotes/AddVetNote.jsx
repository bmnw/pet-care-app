import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const AddVetNote = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);

    const [date, setDate] = useState('');
    const [vet, setVet] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
    }, []);

    const checkNoteLength = (noteInput) => {
        console.log('in checkNoteLength');
        if(noteInput.length <= 1000) {
            setNote(noteInput);
        } else if(noteInput.length > 1000) {
            alert('Vet note cannot be more than 1000 characters.');
            return;
        }
    }

    return  <>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Grid container spacing={2} direction="column" alignContent="center">
                                    <Grid item>
                                        <Typography variant="h5">Add vet note for {detail.pet_name}</Typography>
                                    </Grid>
                                </Grid>
                    })
                }
                <br />
                <Paper elevation={5} sx={{ margin: 2, padding: 2, bgcolor: 'lightgray'}}>
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center"}}>DATE:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                label="YYYY/MM/DD"
                        />
                    </Box>
                    <br />
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center"}}>VET:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={vet}
                                onChange={(event) => setVet(event.target.value)}
                                label="Vet/clinic name"
                        />
                    </Box>
                    <Box>
                        <Typography>NOTE:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={note}
                                // onChange={(event) => setNote(event.target.value)}
                                onChange={(event) => checkNoteLength(event.target.value)}
                                multiline
                                fullWidth
                                rows={8}
                        />
                        <Typography>{note.length}/1000</Typography>
                    </Box>

                    {/* <Box sx={{
                        bgcolor: 'white',
                        border: 1,
                        p: 1,

                    }}>
                    </Box> */}

                </Paper>
            </>
}

export default AddVetNote;