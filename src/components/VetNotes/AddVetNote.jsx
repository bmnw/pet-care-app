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
        console.log('in checkNoteLength', noteInput.length);
        if(noteInput.length <= 1000) {
            setNote(noteInput);
        } else if(noteInput.length > 1000) {
            alert('Vet note cannot be more than 1000 characters.');
            return;
        }
    } // end checkNoteLength

    const submitVetNote = () => {
        console.log('in submitVetNote', date, vet, note);
        dispatch({type: 'SUBMIT_VET_NOTE', payload: {pet_id: petid, date: date, vet: vet, note: note}, toVetNotes: toVetNotes});
    } // end submitVetNote

    const toVetNotes = (petIdInput) => {
        console.log('in toVetNotes');
        history.push(`/vet-notes/${petIdInput}`);
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
                <Paper elevation={10} sx={{ margin: 2, padding: 2, bgcolor: 'lightgray'}}>
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center", width: 50}}>DATE:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                helperText="YYYY/MM/DD"
                        />
                    </Box>
                    <br />
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center", width: 50}}>VET:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={vet}
                                onChange={(event) => setVet(event.target.value)}
                                helperText="Vet/clinic name"
                        />
                    </Box>
                    <br />
                    <Box>
                        <Typography>NOTE:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={note}
                                onChange={(event) => checkNoteLength(event.target.value)}
                                multiline
                                fullWidth
                                rows={8}
                        />
                        <Typography>{note.length}/1000</Typography>
                    </Box>
                </Paper>
                <Box sx={{display: 'flex', justifyContent:'center'}}>
                    <Button onClick={() => history.push(`/vet-notes/${petid}`)} sx={{marginRight: 1}} variant="contained">CANCEL</Button>
                    <Button onClick={submitVetNote} sx={{marginLeft: 1}} variant="contained">ADD NOTE</Button>
                </Box>
            </>
}

export default AddVetNote;