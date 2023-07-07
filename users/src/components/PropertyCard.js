import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { path } from '../dataVariables';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyId } from '../features/propertyIdSlice';
import axios from 'axios';


export default function ImgMediaCard(props) {

  const {propertyId} = useSelector(state => state.propertyId)
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth)


  const handleDelete = async () => {
    const url = `http://localhost:8000/api/dashboard/property/delete/${props.data._id}`
    const res = await axios.delete(url , { headers: {"Authorization" :`Bearer ${token}`}})
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={ `${path}${ props.data.photos[0]}`}
      />
      <CardContent>
        <Typography sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
    }} gutterBottom variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
    }} >
          {props.data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={NavLink} to={`/details/${props.data._id}`} size="small">View</Button>
        <Button size="small" onClick={handleDelete}  ><Typography sx={{color: 'red'}} >Delete</Typography> </Button>
      </CardActions>
    </Card>
  );
}