import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Textfield from '@mui/material/Textfield';

const AddCareForm = ({showForm, setShowForm}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const [careDescription, setCareDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [careDetails, setCareDetails] = useState('');

    const submitCareItem = () => {
        console.log('in submitCareItems', careDescription, frequency, startDate, careDetails);
        dispatch({type: 'SUBMIT_CARE_ITEM', payload: {
                pet_id: petid, 
                description: careDescription, 
                frequency: frequency, 
                start_date: startDate, 
                details: careDetails
            },
            clearInputs: clearInputs
        });
    } // end submitCareItem

    const clearInputs = () => {
        console.log('in clearInputs');
        setCareDescription('');
        setStartDate('');
        setFrequency('');
        setCareDetails('');
    } // end clearInputs

    return  <div style={{marginLeft: 20, marginRight: 20}}>
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
                        {/* Change these buttons to radio buttons */}
                        <Grid item>
                            <Button onClick={() => setFrequency('daily')} sx={{width: 75}} variant="contained">DAILY</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setFrequency('weekly')} sx={{width: 75}} variant="contained">WEEKLY</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setFrequency('monthly')} sx={{width: 75}} variant="contained">MONTHLY</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setFrequency('yearly')} sx={{width: 75}} variant="contained">YEARLY</Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography>Start Date (YYYY/MM/DD):</Typography>
                    </Grid>
                    <Grid item>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    </Grid>
                    <Grid item>
                        <Typography>Care Details (optional):</Typography>
                    </Grid>
                    <Grid item>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={careDetails}
                        onChange={(event) => setCareDetails(event.target.value)}
                        fullWidth 
                        multiline
                    />
                    </Grid>
                </Grid>
                <br />
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                >
                    <Grid item>
                        <Button sx={{width: 100}} onClick={() => setShowForm(!showForm)} variant="contained">CANCEL</Button>
                    </Grid>
                    <Grid item>
                        <Button sx={{width: 100}} onClick={submitCareItem} variant="contained">SAVE</Button>
                    </Grid>
                </Grid>
            </div>
}

export default AddCareForm;