import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const CareDescriptionFormItem = ({careDescription, setCareDescription}) => {
    return  <>
                <Box>
                    <Typography>Description:</Typography>
                    <TextField 
                            sx={{backgroundColor: 'white'}}
                            required
                            label="Required"
                            value={careDescription}
                            onChange={(event) => setCareDescription(event.target.value)}
                            fullWidth 
                        />
                </Box>
            </>
}

export default CareDescriptionFormItem;