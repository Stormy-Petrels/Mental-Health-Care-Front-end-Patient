import React, { useState } from 'react';
import { Button } from '@mui/material';

const ButtonTime = ({ times, handle }) => {
    const { timeStart, timeEnd, calendarId, price } = times;
    const payMent = handle;

    const [variant, setVariant] = useState('outlined');

    const takeTime = () => {
        payMent(timeStart, timeEnd, calendarId, price);
    }

    const handleMouseEnter = () => {
        setVariant('contained');
    };

    const handleMouseLeave = () => {
        setVariant('outlined');
    };

    return (
        <Button
            variant={variant}
            onClick={takeTime}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                '&:hover': {
                    backgroundColor: '#06B6D4',
                    color: 'white' 
                },
                transition: 'background-color 0.3s'  
            }}
        >
            {timeStart} - {timeEnd}
        </Button>
    );
}

export default ButtonTime;
