import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ReminderItem = ({reminder}) => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const taskComplete = (careItemId) => {
        console.log('in taskComplete');
        dispatch({type: 'MARK_AS_COMPLETE', payload: careItemId});
    }

    return <>   
                <Grid container spacing={2} direction="row" display="flex" justifyContent="center">
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography variant="h6" onClick={handleClickOpen}>{reminder.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox color="success" size="large" onClick={() => taskComplete(reminder.id)}/>
                    </Grid>
                </Grid>
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