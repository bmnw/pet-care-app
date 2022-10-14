import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const PetItem = ({pet}) => {
    return  <>
                <Card elevation={10}>
                    <CardContent>
                        <Typography>{pet.pet_name}</Typography>
                    </CardContent>
                </Card>
            </>
}

export default PetItem;