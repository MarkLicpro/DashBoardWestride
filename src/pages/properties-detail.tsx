import { Box, Typography } from '@mui/material';
import { useGetIdentity, useShow } from '@refinedev/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function PropertiesDetail() {
  const navigate = useNavigate()
  const { data: user } = useGetIdentity<any>();

  const {query} = useShow<any>()
  const {data, isLoading, isError} = query
  console.log(data)

  const Properties = data?.data??[];
  if (isLoading) return <Typography>Loading details...</Typography>;
  if (isError) return <Typography>Error loading details</Typography>;
  return (
    <Box
      borderRadius={"15px"}
      padding={"20px"}
      bgcolor={"#fcfcfc"}
      width={"fit-content"}
      >
      <Typography fontSize={25} fontWeight={500} color='#11142d'>Detail</Typography>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={10}
        mt={"10px"}
      >
        <Box
        flex={1}
        maxWidth={700}
        >
          <img
            src={Properties.photo}
            alt={Properties.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />

        </Box>
      </Box>
    </Box>
  )
}

export default PropertiesDetail;