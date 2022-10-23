import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditAttributesSharpIcon from '@mui/icons-material/EditAttributesSharp';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ReminderItem = ({reminder, isComplete}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        console.log('ReminderItem page load');
    }, [reminder]);

    const taskComplete = (careItemId, petId) => {
        console.log('in taskComplete', careItemId, petId);
        dispatch({type: 'MARK_AS_COMPLETE', payload: {id: careItemId, pet_id: petId}});
    }  // end taskComplete

    return <>   
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Paper elevation={10} sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', height: 50, width: 300, padding: 2, marginBottom: 2}}>
                            <Typography variant="h6" onClick={handleClickOpen} sx={{marginRight: 3}}>
                                {reminder.description}
                            </Typography>
                            {
                                isComplete ? <EditAttributesSharpIcon checked color="success" fontSize="large"/> :
                                <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                            }
                    </Paper>
                </Box>               
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