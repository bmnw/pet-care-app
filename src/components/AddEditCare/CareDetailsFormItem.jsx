import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Textfield from '@mui/material/Textfield';

const CareDetailsFormItem = ({careDetails, checkLength}) => {
    return  <>
                <Box>
                    <Typography>Care Details:</Typography>
                    <Textfield 
                        sx={{backgroundColor: 'white'}}
                        value={careDetails}
                        onChange={(event) => checkLength(event.target.value)}
                        fullWidth 
                        multiline
                        rows={3}
                        label="Optional"
                    />
                    <Typography>{careDetails.length}/500</Typography>
                </Box>
            </>
}

export default CareDetailsFormItem;