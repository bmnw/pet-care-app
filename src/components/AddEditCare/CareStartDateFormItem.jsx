import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CareStartDateFormItem = ({colorTheme, startDate, handleDateChange}) => {
    return  <>
                <ThemeProvider theme={colorTheme}>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <MobileDatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <
                                                            TextField 
                                                                {...params} 
                                                                InputProps={{startAdornment: 
                                                                                (<InputAdornment position="start"><CalendarMonthIcon/></InputAdornment>),
                                                                            }} 
                                                                variant="outlined"
                                                                color="blue"
                                                        />
                                            }
                            />
                        </LocalizationProvider>
                    </Box>
                </ThemeProvider>
            </>
}

export default CareStartDateFormItem;