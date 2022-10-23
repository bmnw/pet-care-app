import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import ReminderItem from './ReminderItem.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

    const checkIfComplete = (dateInput) => {
        console.log('in checkIfComplete');
        let today = new Date().toDateString();
        console.log('today:', today);
        let dateCompleted = "";
        if(dateInput === null){
            dateCompleted = null;
        } else if(dateInput != null){
            dateCompleted = new Date(dateInput).toDateString();
        }
        if(dateCompleted === null || dateCompleted < today){
            console.log('incomplete');
            isComplete = false;
        } else if (dateCompleted == today) {
            console.log('complete');
            isComplete = true;
            console.log('should be true:', isComplete);
        } else {
            console.log('neither true or false');
        }
    } // end checkIfComplete

    return  <div>
                <Nav />
                {
                    pet.map(detail => {
                        return  <Grid container spacing={2} direction="column" alignContent="center">
                                    <Grid item>
                                        <Typography variant="h5">What does {detail.pet_name} need today?</Typography>
                                    </Grid>
                                </Grid>
                    })
                }
                <br />
                {
                    reminders.map(reminder => {
 
                        if(checkIfComplete(reminder.date_complete) === true){
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
                <br />
                {
                    pet.map(detail => {
                        return  (
                                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Button 
                                            sx={{width: 200}} 
                                            color='secondary' 
                                            variant="contained" 
                                            onClick={(event) => history.push(`/petprofile/${petid}`)}
                                        >
                                            {detail.pet_name}'s PROFILE
                                        </Button> 
                                    </Box>
                        )                             
                    })
                }
            </div>
}

export default CareReminders;