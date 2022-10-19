import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';

const AddCareForm = () => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const [careDescription, setCareDescription] = useState('');
    const [startDate, setStartDate] = useState('');

    return  <div>
                <br />
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="left"
                >
                    <Grid item>
                        <Typography>Description:</Typography>
                    </Grid>
                    <Grid item>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={careDescription}
                        onChange={(event) => setCareDescription(event.target.value)}
                        fullWidth 
                    />
                    </Grid>
                    <Grid item>
                        <Typography>Frequency:</Typography>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                    >
                        <Grid item>
                            <Button sx={{width: 80}} variant="contained">DAILY</Button>
                        </Grid>
                        <Grid item>
                            <Button sx={{width: 80}} variant="contained">WEEKLY</Button>
                        </Grid>
                        <Grid item>
                            <Button sx={{width: 80}} variant="contained">MONTHLY</Button>
                        </Grid>
                        <Grid item>
                            <Button sx={{width: 80}} variant="contained">YEARLY</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography>Start Date:</Typography>
                    </Grid>
                    <Grid item>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    </Grid>
                </Grid>
            </div>
}

export default AddCareForm;