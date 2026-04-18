import React from 'react'
import BusinessIcon from '@mui/icons-material/Business';
import { Box, Typography } from '@mui/material';

const TitleBanner = ({collapsed}: any) => {
  return (
    
      <Box   style={{ display: 'flex' }}>
        <BusinessIcon sx={{ marginRight: collapsed ? 0 : 2 }}/>
        <Typography fontSize={18} fontWeight={400}
        display={collapsed ? 'none' : 'block'}
        >westride</Typography>
      </Box>
   
  )
}

export default TitleBanner