import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export default function Filter(props) {
  const icons = [
    <Diversity1Icon fontSize="small" />,
    <Diversity2Icon fontSize="small" />,
    <Diversity3Icon fontSize="small" />
  ];
  const [majors, setMajor] = useState([]);

  useEffect(() => {
    const fetchData = async () => 
      {
        try {
          const majors = await axios.get(`http://127.0.0.1:8000/api/major`);
          setMajor(() => majors.data.data);
        }
        catch (error) {
          console.log(error);
        }
      }
      fetchData();
  }, [])

  const handleClick = (e) => {
    props.handleChooseFilter(e.target.value);
  }

  return (
    <div className='filter'>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        {majors.map((major, index) => (
          <div className='filter-item' key={major.id}>
              <MenuList>
                <MenuItem>
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText><button onClick={handleClick} value={major.name}>{major.name}</button></ListItemText>
                </MenuItem>
              </MenuList>
          </div>
        ))}
      </Paper>
    </div>
    
  );
}