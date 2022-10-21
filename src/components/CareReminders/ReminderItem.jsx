import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CompletedReminder from './CompletedReminder.jsx';
import IncompleteReminder from './IncompleteReminder.jsx';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ReminderItem = ({reminder}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        console.log('useEffect is complete?:', isComplete);
        checkIfComplete(reminder.date_complete);
    }, []);

    const checkIfComplete = (dateInput) => {
        // console.log(new Date(dateInput).toDateString()); // doesn't work with null values
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
            setIsComplete(false);
        } else if (dateCompleted == today) {
            console.log('complete');
            setIsComplete(true);
        } else {
            console.log('neither true or false');
        }
    } // end checkIfComplete

    const taskComplete = (careItemId, petId) => {
        console.log('in taskComplete', careItemId, petId);
        dispatch({type: 'MARK_AS_COMPLETE', payload: {id: careItemId, pet_id: petId}, toReminders: toReminders});
    }  // end taskComplete

    const toReminders = (petId) => {
        console.log('in toReminders');
        history.push(`/reminders/${petId}`);
    }

    return <>   {
                    isComplete ? (
                        <CompletedReminder 
                            reminder={reminder}
                            handleClickOpen={handleClickOpen}
                            taskComplete={taskComplete}
                        />
                    ) :
                    (
                        <IncompleteReminder 
                            reminder={reminder}
                            handleClickOpen={handleClickOpen}
                            taskComplete={taskComplete}
                        />
                    )
                }
               
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                >
                    <DialogTitle>
                        {`Details for ${reminder.description}`}
                    </DialogTitle>
                    <DialogContent>
                        {`${reminder.details}`}
                    </DialogContent>
                </Dialog>
            </>
}

export default ReminderItem;