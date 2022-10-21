import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const IncompleteReminder = ({reminder, taskComplete}) => {
    return  <>
                <Grid container spacing={2} direction="row" display="flex" justifyContent="center">
                    <Grid item sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Typography variant="h6">{reminder.description}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch color="success" size="large" onClick={() => taskComplete(reminder.id, reminder.pet_id)}/>
                    </Grid>
                </Grid>
            </>
}

export default IncompleteReminder;