import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditAttributesSharpIcon from '@mui/icons-material/EditAttributesSharp';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ListItemButton from '@mui/material/ListItemButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {GoDash} from 'react-icons/go';
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
                <ListItem>
                    {/* <ListItemIcon> */}
                        <GoDash fontSize="large" />
                    {/* </ListItemIcon> */}
                    <ListItemButton  onClick={handleClickOpen} sx={{width: 200}}>
                        <ListItemText primaryTypographyProps={{fontSize: 18}}>
                            {reminder.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton  onClick={handleClickOpen}>
                        <MoreHorizRoundedIcon sx={{marginRight: 2}} fontSize="large"/>
                    </ListItemButton>
                    <ListItemButton sx={{width: 75}}>
                        {
                            isComplete ? <CheckBoxRoundedIcon checked color="success" fontSize="large"/> :
                            <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                        }
                    </ListItemButton>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    fullWidth
                >
                    <DialogTitle>
                        {`Details for ${reminder.description}`}
                    </DialogTitle>
                    <DialogContent>
                        {`Frequency: ${reminder.frequency}`}
                        <br />
                        <br />
                        {`${reminder.details}`}
                    </DialogContent>
                </Dialog>
            </>
}

export default ReminderItem;