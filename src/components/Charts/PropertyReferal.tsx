import { Box, Stack, Typography } from '@mui/material';
import React from 'react'
import { propertyReferralsInfo } from './Chart.config';

interface PropertyReferalProps {
  // Add props here if needed
  title: string;
  percentage: number;
  color: string;
}

function ProgressBar ({ title, percentage, color }: PropertyReferalProps) {
  return (
    <Box width="100%" >
      <Stack 
        direction="row" 
        alignItems="center"
        justifyContent="space-between"
        >
        <Typography fontSize={16}  fontWeight={500} color="#11142d">
          {title}
        </Typography>
        <Typography fontSize={16}  fontWeight={500} color="#11142d">
          {percentage}%
        </Typography>
      </Stack>
      <Box 
        mt={2} 
        position="relative" 
        width="100%" 
        height="8px" 
        borderRadius={1} 
        bgcolor="#e4e8ef"
        >   
        <Box 
          position="absolute" 
          width={`${percentage}%`}
          height="100%" 
          borderRadius={1} 
          bgcolor={color}>   
        </Box>
      </Box>
      
    </Box>
  )
}

const PropertyReferal =() => {
  return (
    <Box  
      p={4} 
      bgcolor="#fcfcfc" 
      minWidth="300px" 
      display="flex" 
      flexDirection="column" 
      borderRadius="15px"
    >
      <Typography fontSize={18}  fontWeight={600} color="#11142d">Property Referal</Typography>
      <Stack 
        my="20px" 
        direction="column" 
        gap="4px"
        >
          {
            propertyReferralsInfo.map((bar) => {
              return (
                <ProgressBar 
                  key={bar.title} 
                  {...bar}
                />
              )
            }) 
          }
      </Stack>
    </Box>
  )
}

export default PropertyReferal 