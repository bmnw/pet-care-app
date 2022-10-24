import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FeedSharpIcon from '@mui/icons-material/FeedSharp';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ListItemButton from '@mui/material/ListItemButton';
import { Feed } from '@mui/icons-material';

const CareItem = ({item, petid}) => {

    const dispatch = useDispatch();

    // variable and functions for dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const deleteCareItem = (itemId) => {
        console.log('in deleteCareItem', itemId, petid);
        dispatch({type: 'DELETE_CARE_ITEM', payload: {id: itemId, pet_id: Number(petid)}});
    } // end deleteCareItem

    return  <div style={{marginLeft: 15}}>
                <ListItem>
                    <ListItemIcon>
                        <ArrowForwardIosSharpIcon />
                    </ListItemIcon>
                    <ListItemButton onClick={handleClickOpen} sx={{width: 160}}>
                        <ListItemText>
                            {item.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleClickOpen}>
                        <FeedSharpIcon fontSize="large" />
                    </ListItemButton>
                    <ListItemButton onClick={(event) => deleteCareItem(item.id)}>
                        <DeleteIcon fontSize="large" />
                    </ListItemButton>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                >
                    <DialogTitle>
                        {`Details for ${item.description}`}
                    </DialogTitle>
                    <DialogContent>
                        {`Frequency: ${item.frequency}`}
                        <br />
                        <br />
                        {`${item.details}`}
                    </DialogContent>
                </Dialog>                
            </div>
}

export default CareItem;