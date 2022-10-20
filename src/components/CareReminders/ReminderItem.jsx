import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ReminderItem = ({reminder}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    return <>   
                <Grid container spacing={2} direction="row" display="flex" justifyContent="center" onClick={handleClickOpen}>
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography>{reminder.description}</Typography>
                    </Grid>
                    <Grid item>
                        <CheckCircleOutlineIcon  fontSize="large"/>
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