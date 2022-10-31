import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

const CareFrequencyFormItem = ({frequency, handleChange}) => {
    return  <>
                <Box sx={{width: 125, bgcolor: 'white'}}>
                    <FormControl fullWidth required>
                        <InputLabel>Frequency</InputLabel>
                        <Select
                            label="Frequency"
                            value={frequency}
                            onChange={handleChange}
                        >
                            <MenuItem value="daily">DAILY</MenuItem>
                            <MenuItem value="weekly">WEEKLY</MenuItem>
                            <MenuItem value = "monthly">MONTHLY</MenuItem>
                            <MenuItem value="yearly">YEARLY</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </>
}

export default CareFrequencyFormItem;