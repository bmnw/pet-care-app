import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Textfield from '@mui/material/Textfield';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';


const AddCareForm = ({showForm, setShowForm}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const [careDescription, setCareDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [careDetails, setCareDetails] = useState('');

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

    const handleChange = (event) => {
        console.log('in handleChange', event.target.value);
        setFrequency(event.target.value);
    }

    const handleDateChange = (newDate) => {
        console.log(moment(newDate._d).format('YYYY/MM/DD'));
        setStartDate(moment(newDate._d).format('YYYY/MM/DD'));
        console.log('startDate', startDate);
    }

    const submitCareItem = () => {
        console.log('in submitCareItems', careDescription, frequency, startDate, careDetails);
        // validate that careDescription, frequency, and stateDate have values
        if(careDescription && frequency && startDate){
            dispatch({type: 'SUBMIT_CARE_ITEM', payload: {
                    pet_id: petid, 
                    description: careDescription, 
                    frequency: frequency, 
                    start_date: startDate, 
                    details: careDetails
                },
                    clearInputs: clearInputs
            });
        } else {
            alert('Care description, frequency, and start date are required.');
        }
    } // end submitCareItem

    const clearInputs = () => {
        console.log('in clearInputs');
        setCareDescription('');
        setStartDate('');
        setFrequency('');
        setCareDetails('');
    } // end clearInputs

    const checkLength = (detailsInput) => {
        console.log('in checkLength');
        if(detailsInput.length <= 500) {
            setCareDetails(detailsInput);
        } else {
            alert('Care details cannot be more than 500 characters.');
        }
    } // end checkLength

    return  <div style={{marginLeft: 20, marginRight: 20}}>
                <br />
                <Box>
                    <Typography>Description:</Typography>
                    <Textfield 
                            sx={{backgroundColor: 'white'}}
                            required
                            label="Required"
                            value={careDescription}
                            onChange={(event) => setCareDescription(event.target.value)}
                            fullWidth 
                        />
                </Box>
                <br />
                <Box sx={{width: 125, bgcolor: 'white'}}>
                    <FormControl fullWidth required>
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
                <ThemeProvider theme={colorTheme}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                label="Start Date"
                                // imputFormat="YYYY/MM/DD"
                                value={startDate}
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
                <br />
                <Box>
                    <Typography>Care Details:</Typography>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        value={careDetails}
                        onChange={(event) => checkLength(event.target.value)}
                        fullWidth 
                        multiline
                        rows={3}
                        label="Optional"
                    />
                    <Typography>{careDetails.length}/500</Typography>
                </Box>
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <Button sx={{width: 100, marginRight: 1}} onClick={() => setShowForm(!showForm)} size="large" variant="contained" color="white">CANCEL</Button>
                        <Button sx={{width: 100, marginLeft: 1}} onClick={submitCareItem} variant="contained" size="large" color="orange">SAVE</Button>
                    </Box>
                </ThemeProvider>
            </div>
}

export default AddCareForm;