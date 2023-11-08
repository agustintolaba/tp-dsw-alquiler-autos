/*Para crear el componente de vehiculo*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function VehiculoItem(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={props.alt}
        height="140"
        image={props.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'$', props.precioDiaTipoVehiculo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Alquilar</Button>
        <Button size="small">Mas información</Button>
      </CardActions>
    </Card>
  );
}
