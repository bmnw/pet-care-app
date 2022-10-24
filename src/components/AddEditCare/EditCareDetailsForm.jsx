import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Textfield from '@mui/material/Textfield';

const EditCareDetailsForm = ({item, petid, showForm, setShowForm}) => {

    const dispatch = useDispatch();
    const [careDetails, setCareDetails] = useState('');

    const updateCareDetails = (itemInput, petInput) => {
        console.log('in updateCareDetails', itemInput, petInput, careDetails);
        // validate that careDetails has a value
        if(careDetails) {
            dispatch({type: 'UPDATE_CARE_DETAILS', payload: {id: itemInput, pet_id: petInput, details: careDetails}, hideForm: hideForm});
        } else {
            alert("Please update details or click cancel.");
        }
        // dispatch({type: 'UPDATE_CARE_DETAILS', payload: {id: itemInput, pet_id: petInput, details: careDetails}, hideForm: hideForm});
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
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        value={careDetails}
                        onChange={(event) => checkLength(event.target.value)}
                        fullWidth 
                        multiline
                        rows={4}
                        label="Update details here"
                    />
                    <Typography>{careDetails.length}/500</Typography>
                </Box>
                <br />
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button sx={{width: 100, marginRight: 1}} onClick={() => setShowForm(!showForm)} variant="contained">CANCEL</Button>
                        <Button sx={{width: 100, marginLeft: 1}} onClick={() => updateCareDetails(item.id, petid)} variant="contained">SAVE</Button>
                </Box>
            </>
}

export default EditCareDetailsForm;