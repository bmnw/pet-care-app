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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';

const AddVetNote = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);

    const [date, setDate] = useState('');
    const [vet, setVet] = useState('');
    const [note, setNote] = useState('');

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
    }, []);

    const handleDateChange = (newDate) => {
        console.log(moment(newDate._d).format('YYYY/MM/DD'));
        setDate(moment(newDate._d).format('YYYY/MM/DD'));
        console.log('startDate', date);
    }

    const checkNoteLength = (noteInput) => {
        console.log('in checkNoteLength', noteInput.length);
        if(noteInput.length <= 1000) {
            setNote(noteInput);
        } else if(noteInput.length > 1000) {
            alert('Vet note cannot be more than 1000 characters.');
        }
    } // end checkNoteLength

    const submitVetNote = () => {
        console.log('in submitVetNote', date, vet, note);
        // validate that date, vet, and note have values
        if(date && vet && note){
            dispatch({type: 'SUBMIT_VET_NOTE', payload: {pet_id: petid, date: date, vet: vet, note: note}, toVetNotes: toVetNotes});
        } else {
            alert('Date, vet/clinic name, and note text are required.');
        }
        // dispatch({type: 'SUBMIT_VET_NOTE', payload: {pet_id: petid, date: date, vet: vet, note: note}, toVetNotes: toVetNotes});
    } // end submitVetNote

    const toVetNotes = (petIdInput) => {
        console.log('in toVetNotes');
        history.push(`/vet-notes/${petIdInput}`);
    }

    return  <div>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Grid key={detail.id} container spacing={2} direction="column" alignContent="center">
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
                        <ThemeProvider theme={colorTheme}>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <MobileDatePicker
                                        label="Date"
                                        // imputFormat="YYYY/MM/DD"
                                        value={date}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <
                                                                    Textfield 
                                                                        {...params} 
                                                                        InputProps={{startAdornment: 
                                                                                        (<InputAdornment position="start"><CalendarMonthIcon/></InputAdornment>),
                                                                                    }} 
                                                                        variant="outlined"
                                                                        color="blue"
                                                                />
                                                    }
                                    />
                                </LocalizationProvider>
                            </Box>
                        </ThemeProvider>
                    </Box>
                    <br />
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center", width: 50}}>VET:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={vet}
                                onChange={(event) => setVet(event.target.value)}
                                label="Vet/clinic name"
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
                                label="Notes from the appointment"
                        />
                        <Typography>{note.length}/1000</Typography>
                    </Box>
                </Paper>
                <br />
                <ThemeProvider theme={colorTheme}>
                <Box sx={{display: 'flex', justifyContent:'space-evenly'}}>
                    <Button onClick={() => history.push(`/vet-notes/${petid}`)} variant="contained" size="large" color="white">CANCEL</Button>
                    <Button onClick={submitVetNote} variant="contained" size="large" color="orange">ADD NOTE</Button>
                </Box>
                </ThemeProvider>
            </div>
}

export default AddVetNote;