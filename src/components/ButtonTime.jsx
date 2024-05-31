import { Button } from "@mui/material";

const ButtonTime = ({times, handle}) => {
    const {timeStart, timeEnd, calendarId, price} = times;
    const payMent = handle;

    const takeTime = () =>{
        payMent(timeStart, timeEnd, calendarId, price);
    }

    return (
        <Button variant="contained" onClick={takeTime}>
            {timeStart} - {timeEnd}
        </Button>
    )
}

export default ButtonTime;