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
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Paper elevation={10} sx={{display: 'flex', alignItems:'center', justifyContent: 'flex-end', minHeight: 50, width: 300, padding: 1, marginBottom: 2}}>
                        <Typography onClick={handleClickOpen} sx={{marginRight: 1}}>
                            {item.description}
                        </Typography>
                        <Button onClick={handleClickOpen}><FeedSharpIcon fontSize="large"/></Button>
                        {/* create user confirmation dialog for this delete */}
                        <Button onClick={(event) => deleteCareItem(item.id)}><DeleteIcon fontSize="large"/></Button> 
                    </Paper>
                </Box>   
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                >
                    <DialogTitle>
                        {`Details for ${item.description}`}
                    </DialogTitle>
                    <DialogContent>
                        {`${item.details}`}
                    </DialogContent>
                </Dialog>                
            </div>
}

export default CareItem;