import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import ReminderItem from './ReminderItem.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const CareReminders = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const reminders = useSelector(store => store.care.reminders);
    let isComplete = false;

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_REMINDERS', payload: petid});
    }, []);

    const checkIfComplete = (dateInput, textInput) => {
        console.log('in checkIfComplete', textInput);
        let today = new Date().toDateString();
        console.log('today:', today);
        let dateCompleted = "";
        if(dateInput === null){
            dateCompleted = null;
        } else if(dateInput != null){
            dateCompleted = new Date(dateInput).toDateString();
        }
        console.log('date completed:', dateCompleted)
        if(dateCompleted === null || dateCompleted != today){
            console.log('incomplete');
            return false;
        } else if (dateCompleted == today) {
            console.log('complete');
            return true;
        } else {
            console.log('neither true or false');
        }
    } // end checkIfComplete

    return  <div>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                    <Typography variant="h5">What does {detail.pet_name} need today?</Typography>
                                </Box>
                    })
                }
                <List sx={{width: '100%'}}>
                    {   
                        reminders.map(reminder => {
    
                            if(checkIfComplete(reminder.date_complete, reminder.description) === true){
                                isComplete = true;
                            } else if (checkIfComplete(reminder.date_complete) === false){
                                isComplete = false;
                            }
                            return  <ReminderItem 
                                        reminder={reminder}
                                        isComplete={isComplete}
                                    />
                        })
                    }
                 </List>
                <br />
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        sx={{width: 200, height: 60}} 
                        color="white" 
                        variant="contained" 
                        size="large"
                        onClick={(event) => history.push(`/petprofile/${petid}`)}
                    >
                        PET PROFILE
                    </Button> 
                </Box>
            </div>
}

export default CareReminders;