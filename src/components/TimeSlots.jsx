import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SlidePanel = () => {
  return (
    // <div className="bg-white shadow-md shadow-gray-500 p-3 lg:p-5 rounded-md">
        <Button variant="contained" className=" w-full rounded-md">
            <Link to="/">Book Appoinment</Link>
        </Button>
    // </div>
  );
};

export default SlidePanel;