import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const VetNoteItem = ({note}) => {

    return  <>
                <Paper sx={{border: 1, margin: 2, padding: 2, bgcolor: 'lightgray'}}>
                    <Typography>Date: {new Date(note.date).toDateString()}</Typography>
                    <Typography>Vet: {note.vet}</Typography>
                    <Box sx={{
                        bgcolor: 'white',
                        border: 1,
                        p: 1,

                    }}>
                        <Typography>{note.note}</Typography>
                    </Box>

                </Paper>
            </>
}

export default VetNoteItem;