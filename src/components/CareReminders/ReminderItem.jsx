import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
        console.log(dateInput);
        let today = new Date();
        if(dateInput){
            console.log('complete');
            setIsComplete(true);
        } else if (dateInput === null) {
            console.log('incomplete');
            setIsComplete(false);
        } else {
            console.log('neither true or false');
        }
        console.log('is complete?:', isComplete);
    } // end checkIfComplete

    const taskComplete = (careItemId) => {
        console.log('in taskComplete');
        dispatch({type: 'MARK_AS_COMPLETE', payload: careItemId});
    }  // end taskComplete

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