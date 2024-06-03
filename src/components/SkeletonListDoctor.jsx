import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SkeletonListDoctor(props = {}) {
  const { size = 'default' } = props;

  const customStyle = size === 'small' ? { width: 100, height: 100} : {};

  return (
    <Box className="process" sx={customStyle}>
      <CircularProgress />
      <h3>Please wait a moment</h3>
    </Box>
  );
}
