import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Textfield from '@mui/material/Textfield';

const CareDescriptionFormItem = ({careDescription, setCareDescription}) => {
    return  <>
                <Box>
                    <Typography>Description:</Typography>
                    <Textfield 
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