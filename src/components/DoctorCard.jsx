import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageDefault from '../assets/ImageDefaultDoctor.jpg';
import ReactPaginate from 'react-paginate';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';

const DoctorCard = ({doctors}) =>
{
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    if (doctors.length === 0) {var check  = false;} else {check  = true;}

    useEffect(() => {
        setTotalPage(Math.ceil(doctors.length / 6))
    }, [doctors]);
    const CheckImage = (UrlImage) => {
        try {
            return require("/src/assets/" + UrlImage );
        }
        catch (error) {
            return ImageDefault;
        }
    } 

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    var indexLast = currentPage * 6;
    var indexFirst = indexLast - 6;
    var currentPageData = doctors.slice(indexFirst, indexLast);
    
    return(
        <div className='listDoctors'>
            {currentPageData.map((doctor) => (
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
            {check &&
            <div className='paginate'>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
                    onPageChange={handlePageClick}
                    pageCount={totalPage}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={<ArrowBackIosNewIcon style={{ fontSize: 18, width: 150 }} />}
                />
            </div>}
        </div>
    )
}

export default DoctorCard;