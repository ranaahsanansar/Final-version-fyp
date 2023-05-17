import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

export default function ImgMediaCard(props) {
  // console.log(props.data.image)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.data.image}
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
          {props.data.des}
        </Typography>
      </CardContent>
      <CardActions>

        <Button component={NavLink} to='/details' size="small">View</Button>
        <Button component={NavLink} to='/dashboard/updateProperty' size="small">Edit</Button>
        <Button size="small"><Typography sx={{color: 'red'}} >Delete</Typography> </Button>
      </CardActions>
    </Card>
  );
}