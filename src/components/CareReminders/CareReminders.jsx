import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import ReminderItem from './ReminderItem.jsx';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CareReminders = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    let {petid} = useParams();

    const pet = useSelector(store => store.pet.petDetails);
    const reminders = useSelector(store => store.care.reminders);

    useEffect(() => {
        console.log(petid);
        dispatch({type: 'REFRESH_PET_DETAILS', payload: petid});
        dispatch({type: 'FETCH_REMINDERS', payload: petid});
    }, []);

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
                <Grid container direction="column" sx={{display: "flex", justifyContent: "center"}}>
                {
                    reminders.map(reminder => {
                        return  <ReminderItem 
                                    reminder={reminder}
                                />
                    })
                }
                </Grid>
                <br />
                {
                    pet.map(detail => {
                        return  <Grid sx={{display: "flex", justifyContent: "center"}}>
                                    <Grid item>
                                        <Button 
                                            sx={{width: 200}} 
                                            color='secondary' 
                                            variant="contained" 
                                            onClick={(event) => history.push(`/petprofile/${petid}`)}
                                        >
                                            {detail.pet_name}'s PROFILE
                                        </Button>
                                    </Grid>
                                </Grid>
                        
                                
                    })

                }
            </div>
}

export default CareReminders;