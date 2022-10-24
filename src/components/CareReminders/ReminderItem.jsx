import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditAttributesSharpIcon from '@mui/icons-material/EditAttributesSharp';
import FeedSharpIcon from '@mui/icons-material/FeedSharp';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';

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
                <ListItem
                    // secondaryAction={
                    //     <IconButton edge="end">
                    //         {
                    //             isComplete ? <EditAttributesSharpIcon checked color="success" fontSize="large"/> :
                    //             <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                    //         }
                    //     </IconButton>
                    // }
                >
                    <ListItemIcon>
                        <ArrowForwardIosSharpIcon />
                    </ListItemIcon>
                    <ListItemButton  onClick={handleClickOpen}>
                        <ListItemText>
                            {reminder.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  onClick={handleClickOpen}>
                        <FeedSharpIcon sx={{marginRight: 2}} fontSize="large"/>
                    </ListItemButton>
                    <ListItemButton>
                        {
                            isComplete ? <EditAttributesSharpIcon checked color="success" fontSize="large"/> :
                            <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                        }
                    </ListItemButton>
                </ListItem>
                {/* <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Paper elevation={10} sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', minHeight: 50, width: 300, padding: 1, marginBottom: 2}}>
                        <Typography onClick={handleClickOpen} sx={{marginRight: 3}}>
                            {reminder.description}
                        </Typography>
                        <Button onClick={handleClickOpen} sx={{marginRight: 2}}><FeedSharpIcon fontSize="large"/></Button>
                        {
                            isComplete ? <EditAttributesSharpIcon checked color="success" fontSize="large"/> :
                            <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                        }
                    </Paper>
                </Box>                */}
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