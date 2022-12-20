import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const EditCareDetailsForm = ({item, petid, showForm, setShowForm}) => {

    const dispatch = useDispatch();
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

      useEffect(() => {
        console.log('page load');
        setCareDetails(item.details);
      }, []);

    const updateCareDetails = (itemInput, petInput) => {
        console.log('in updateCareDetails', itemInput, petInput, careDetails);
        // validate that careDetails has a value
        if(careDetails) {
            dispatch({type: 'UPDATE_CARE_DETAILS', payload: {id: itemInput, pet_id: petInput, details: careDetails}, hideForm: hideForm});
        } else {
            alert("Please update details or click cancel.");
        }
    } // end updateCareDetails

    const hideForm = () => {
        console.log('in hideForm');
        setShowForm(!showForm);
    } // end hideForm

    const checkLength = (detailsInput) => {
        console.log('in checkLength');
        if(detailsInput.length <= 500) {
            setCareDetails(detailsInput);
        } else {
            alert('Care details cannot be more than 500 characters.');
        }
    }

    return  <>
                <Box>
                    <br />
                    <Typography>Edit Care Details:</Typography>
                    <TextField 
                        sx={{backgroundColor: 'white'}}
                        value={careDetails}
                        onChange={(event) => checkLength(event.target.value)}
                        fullWidth 
                        multiline
                        rows={4}
                    />
                    <Typography>{careDetails.length}/500</Typography>
                </Box>
                <br />
                <ThemeProvider theme={colorTheme}>
                    <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                      <Button color="orange" sx={{width: 100, marginLeft: 1}} size="large" onClick={() => updateCareDetails(item.id, petid)} variant="contained">SAVE</Button>
                    </Box>
                </ThemeProvider>

            </>
}

export default EditCareDetailsForm;