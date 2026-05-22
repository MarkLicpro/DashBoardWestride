import React from 'react'
import title from '../header/title'
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Place } from '@mui/icons-material';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  photo: string;
}

const PropertyCard = ({ id, title, location, price, photo }: PropertyCardProps) => {
  return ( 
    <Card component={Link}
      to={`/properties/show/${id}`}
      sx={{
        textDecoration: "none",
        maxWidth: "330px",
        padding: "10px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
      elevation={0}
      >
      <CardMedia
        component="img"
        height="210"
        width="100%"
        image={photo}
        alt={title}
        sx={{ borderRadius: "10px" }}
      />
      <CardContent
      sx={{ display: "flex", 
            flexDirection: "row", 
            gap: 1, 
            justifyContent: "space-between", 
            padding: "5px" 
          }}
        >
          <Stack direction={"column"} gap={1}>
            <Typography fontSize={"16px"} fontWeight={500} color={"#11142d"}>
              {title}
            </Typography>
            <Stack direction={"row"} gap={0.5} alignItems={"flex-start"}>
            <Place sx={{ fontSize: "18px", color: "#11142d", marginTop: "0.5px" }} 
            />
            <Typography fontSize={"16px"} fontWeight={500} color={"#11142d"}>
              {location}
            </Typography>
            </Stack>
          </Stack>
          <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor={"#dadefa"}
          height={"fit-content"}
          >
          <Typography fontSize={"12px"} fontWeight={500} color={"#475be8"}>
            ${price.toLocaleString()}
          </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  
}

export default PropertyCard