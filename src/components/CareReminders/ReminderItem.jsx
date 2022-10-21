import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CompletedReminder from './CompletedReminder.jsx';
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
        checkIfComplete(reminder.date_complete);
    }, []);

    const checkIfComplete = (dateInput) => {
        console.log(dateInput);
        let today = new Date();
        if(dateInput = today){
            setIsComplete(true);
        } else if (dateInput < today) {
            setIsComplete(false);
        }
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
                        <Grid container spacing={2} direction="row" display="flex" justifyContent="center">
                            <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Typography variant="h6" onClick={handleClickOpen}>{reminder.description}</Typography>
                            </Grid>
                            <Grid item>
                                <Switch color="success" size="large" onClick={() => taskComplete(reminder.id)}/>
                            </Grid>
                        </Grid>
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