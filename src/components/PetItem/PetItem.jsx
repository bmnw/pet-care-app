import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const PetItem = ({pet}) => {
    return  <>
                <Card elevation={10} sx={{margin: 2, width: 150}}>
                    <CardMedia
                        component="img"
                        height="150"
                        // image={"/images/rabbit-1-cropped.jpeg"}
                        image={pet.image}
                    />
                    <CardContent>
                        <Typography>{pet.pet_name}</Typography>
                    </CardContent>
                </Card>
            </>
}

export default PetItem;