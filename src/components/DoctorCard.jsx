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

const DoctorCard = ({ doctors, nameMajor }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [newDataDoctors, setNewDataDoctors] = useState([]);
    const [currentDataDoctors, setCurrentDataDoctors] = useState([]);

    useEffect(() => {
        const filteredDoctors = doctors.filter((doctor) => nameMajor === doctor.major);
        setNewDataDoctors(filteredDoctors);
        setCurrentPage(0);
    }, [doctors, nameMajor]);

    useEffect(() => {
        const indexLast = (currentPage + 1) * 6;
        const indexFirst = indexLast - 6;
        setCurrentDataDoctors(newDataDoctors.slice(indexFirst, indexLast));
    }, [newDataDoctors, currentPage]);

    const getImage = (UrlImage) => {
        try {
            return require("/src/assets/" + UrlImage);
        } catch (error) {
            return ImageDefault;
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='listDoctors'>
            {currentDataDoctors.map((doctor) => (
                <Card className='card' sx={{ maxWidth: 200 }} key={doctor.id}>
                    <CardMedia
                        component="img"
                        alt={doctor.id}
                        height="50"
                        image={getImage(doctor.image)}
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
                        <Button className='buttonBook' size="small">Book</Button>
                    </CardActions>
                </Card>
            ))}
            <div className='paginate'>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel={currentDataDoctors.length === 0 ? "" :<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(newDataDoctors.length / 6)}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={currentDataDoctors.length === 0 ? "" : <ArrowBackIosNewIcon style={{ fontSize: 18, width: 150 }} />}
                />
            </div>
        </div>
    );
}

export default DoctorCard;