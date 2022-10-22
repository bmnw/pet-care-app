import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const VetNoteItem = ({note}) => {

    return  <>
                <Paper sx={{margin: 2, padding: 1}}>
                    <Typography>Date: {new Date(note.date).toDateString()}</Typography>
                    <Typography>Vet: {note.vet}</Typography>
                    <br />
                    <Box sx={{
                        bgcolor: 'lightgray',
                        p: 1
                    }}>
                        <Typography>{note.note}</Typography>
                    </Box>

                </Paper>
            </>
}

export default VetNoteItem;