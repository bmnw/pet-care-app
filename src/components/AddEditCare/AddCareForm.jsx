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
import ButtonGroup from '@mui/material/ButtonGroup';
import {FaTooth} from 'react-icons/fa';
import {GiComb} from 'react-icons/gi';
import {FaPoop} from 'react-icons/fa';
import {AiFillHeart} from 'react-icons/ai';
import {FaWalking} from 'react-icons/fa';
import {AiOutlineEye} from 'react-icons/ai';
import {GiMedicines} from 'react-icons/gi';
import {FaBath} from 'react-icons/fa';
import CareDescriptionFormItem from './CareDescriptionFormItem.jsx';
import CareFrequencyFormItem from './CareFrequencyFormItem.jsx';
import CareStartDateFormItem from './CareStartDateFormItem.jsx';
import CareDetailsFormItem from './CareDetailsFormItem.jsx';


const AddCareForm = ({showForm, setShowForm}) => {

    const dispatch = useDispatch();
    let {petid} = useParams();

    const [careDescription, setCareDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [careDetails, setCareDetails] = useState('');
    const [icon, setIcon] = useState('');

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
          },
          black: {
            main: '#000000',
          }
        }
      });

    const handleChange = (event) => {
        console.log('in handleChange', event.target.value);
        setFrequency(event.target.value);
    }

    const handleChangeIcon = (event) => {
        console.log('in handleChangeIcon', event.target.value);
        setIcon(event.target.value);
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
                <CareDescriptionFormItem 
                    setCareDescription={setCareDescription}
                    careDescription={careDescription}
                />
                <br />
                <CareFrequencyFormItem 
                    frequency={frequency}
                    handleChange={handleChange}
                />
                <br />
                <CareStartDateFormItem 
                    colorTheme={colorTheme}
                    handleDateChange={handleDateChange}
                    startDate={startDate}
                />
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box>
                        <Typography>Care Icon:</Typography>
                        <br />
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <ButtonGroup variant="text">
                                <Button sx={{fontSize: 30}} color="black"><FaTooth/></Button>
                                <Button sx={{fontSize: 30}} color="black"><GiComb/></Button>
                                <Button sx={{fontSize: 30}} color="black"><FaPoop/></Button>
                                <Button sx={{fontSize: 30}} color="black"><AiFillHeart/></Button>
                                <Button sx={{fontSize: 30}} color="black"><FaWalking/></Button>
                                <Button sx={{fontSize: 30}} color="black"><AiOutlineEye/></Button>
                                <Button sx={{fontSize: 30}} color="black"><GiMedicines/></Button>
                                <Button sx={{fontSize: 30}} color="black"><FaBath/></Button>
                            </ButtonGroup>
                        </Box>

                    </Box>
                </ThemeProvider>

                <br />
                <CareDetailsFormItem 
                    careDetails={careDetails}
                    checkLength={checkLength}
                />
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