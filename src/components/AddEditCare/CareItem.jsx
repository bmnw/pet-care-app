import {useState} from 'react';
import {useDispatch} from 'react-redux';
import EditCareDetailsForm from './EditCareDetailsForm.jsx';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import {GoDash} from 'react-icons/go';

const CareItem = ({item, petid}) => {

    const dispatch = useDispatch();

    // variable for dialog edit form conditional rendering
    const [showForm, setShowForm] = useState(false);

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
                    <GoDash fontSize="large" />
                    <ListItemButton onClick={handleClickOpen} sx={{width: 200}}>
                        <ListItemText primaryTypographyProps={{fontSize: 18}}>
                            {item.description}
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={handleClickOpen}>
                        <MoreHorizRoundedIcon fontSize="large" />
                    </ListItemButton>
                    <ListItemButton onClick={(event) => deleteCareItem(item.id)}>
                        <DeleteIcon color="blue" fontSize="large" />
                    </ListItemButton>
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                    fullWidth
                >
                    <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        {`Details for ${item.description}`}
                        <Fab sx={{marginLeft: 1}} color="orange" onClick={() => setShowForm(!showForm)}>
                            <EditIcon />
                        </Fab>
                    </DialogTitle>
                    <DialogContent>
                        {
                            showForm ? (
                                <>
                                    <Typography>Frequency: {item.frequency}</Typography>
                                    <EditCareDetailsForm 
                                        item={item}
                                        petid={petid}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                    />
                                </> 
                            ) : (
                                <>
                                    Frequency: {item.frequency}
                                    <br />
                                    <br />
                                    {`${item.details}`}
                                </> 
                            )
                        }
                    </DialogContent>
                </Dialog>                
            </div>
}

export default CareItem;