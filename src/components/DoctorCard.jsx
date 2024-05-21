import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageDefault from '../assets/ImageDefaultDoctor.jpg';

const doctorCard = ({props}) =>
{
    const doctors = props;

    const CheckImage = (UrlImage) => {
        try {
            return require("/src/assets/" + UrlImage );
        }
        catch (error) {
            return ImageDefault;
        }
    } 
    
    return(
        <div className='listDoctors'>
            {doctors.map((doctor) => (
                <Card sx={{ maxWidth: 200 }} key={doctor.id} className='card'>
                    <CardMedia
                        component="img"
                        alt={doctor.id}
                        height="50"
                        image={CheckImage(doctor.image)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {doctor.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {doctor.major}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Book</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}

export default doctorCard;