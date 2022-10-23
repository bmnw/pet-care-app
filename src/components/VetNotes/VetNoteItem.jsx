import {useState} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const VetNoteItem = ({note}) => {

    // dialog feature variables and functions
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const deleteVetNote = (noteIdInput) => {
        console.log('in deleteVetNote', noteIdInput);

    } // end deleteVetNote

    return  <>
                <Paper elevation={10} sx={{margin: 2, padding: 2, bgcolor: 'lightgray'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{display: 'flex', alignItems: 'center'}}>Date: {new Date(note.date).toDateString()}</Typography>
                        <Button onClick={handleClickOpen}><DeleteIcon/></Button>
                    </Box>
                    <Typography>Vet: {note.vet}</Typography>
                    <Box sx={{
                        bgcolor: 'white',
                        p: 1,
                    }}>
                        <Typography>{note.note}</Typography>
                    </Box>
                </Paper>
                <Dialog
                    open={open}
                    onClose={handleClickClose}
                >
                    <DialogTitle>
                        {"Delete this vet note?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClickClose} variant="contained">No</Button>
                        <Button onClick={() => deleteVetNote(note.id)}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </>
}

export default VetNoteItem;