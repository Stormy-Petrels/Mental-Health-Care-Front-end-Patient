import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SkeletonListDoctor() {
  return (
    <Box className="process">
      <CircularProgress />
      <h3>Please waiting some minute</h3>
    </Box>
  );
}