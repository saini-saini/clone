import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function ContinuousSlider({ width, startTime, endTime, value, onChange }) {
  return (
    <Box sx={{ width: width }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <span style={{color:"gray"}}>{startTime}</span>
        <Slider aria-label="Volume" value={value} onChange={onChange} />
        <span style={{color:"gray"}}>{endTime}</span>
      </Stack>
    </Box>
  );
}
