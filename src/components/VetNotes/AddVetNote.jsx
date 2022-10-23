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

    const [noteDate, setNoteDate] = useState('');

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
    }, []);

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
                <Paper sx={{border: 1, margin: 2, padding: 2, bgcolor: 'lightgray'}}>
                    <Box sx={{display: 'flex'}}>
                        <Typography sx={{display:"flex", alignItems:"center", marginRight: 1}}>DATE:</Typography>
                        <Textfield 
                                sx={{backgroundColor: 'white'}}
                                required
                                value={noteDate}
                                onChange={(event) => setNoteDate(event.target.value)}
                                label="YYYY/MM/DD"
                        />
                    </Box>

                    <Typography>VET:</Typography>
                    <Typography>NOTE:</Typography>
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