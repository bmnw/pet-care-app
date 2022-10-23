import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Textfield from '@mui/material/Textfield';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const AddCareForm = ({showForm, setShowForm}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const [careDescription, setCareDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [careDetails, setCareDetails] = useState('');

    const handleChange = (event) => {
        console.log('in handleChange', event.target.value);
        setFrequency(event.target.value);
    }

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
                <Box>
                    <Typography>Description:</Typography>
                    <Textfield 
                            sx={{backgroundColor: 'white'}}
                            required
                            value={careDescription}
                            onChange={(event) => setCareDescription(event.target.value)}
                            fullWidth 
                        />
                </Box>
                <br />
                <Box sx={{width: 125}}>
                    <FormControl fullWidth>
                        <InputLabel>Frequency</InputLabel>
                        <Select
                            label="Frequency"
                            value={frequency}
                            onChange={handleChange}
                        >
                            <MenuItem value="daily">DAILY</MenuItem>
                            <MenuItem value="weekly">WEEKLY</MenuItem>
                            <MenuItem value = "monthly">MONTHLY</MenuItem>
                            <MenuItem value="yearly">YEARLY</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <br />
                <Box>
                    <Typography>Start Date (YYYY/MM/DD):</Typography>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                </Box>
                <br />
                <Box>
                    <Typography>Care Details (optional):</Typography>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        required
                        value={careDetails}
                        onChange={(event) => setCareDetails(event.target.value)}
                        fullWidth 
                        multiline
                    />
                </Box>
                <br />
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button sx={{width: 100, marginRight: 1}} onClick={() => setShowForm(!showForm)} variant="contained">CANCEL</Button>
                    <Button sx={{width: 100, marginLeft: 1}} onClick={submitCareItem} variant="contained">SAVE</Button>
                </Box>
            </div>
}

export default AddCareForm;