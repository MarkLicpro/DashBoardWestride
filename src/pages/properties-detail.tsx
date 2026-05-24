import { ArrowBack, ChatBubble, Place, Star , Edit, Phone, Delete} from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import  CustomButton  from '../components/Common/CustomButton';

const checkImage = (url: string) => {
  const image = new Image();
  image.src = url;
  return image.width > 0 && image.height !== 0;
}



function PropertiesDetail() {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<any>();

  // 1. ดูดตัวแปร id ออกมาจาก URL (ที่ต่อท้ายคำว่า /show/...)
  const { id } = useParams(); 
  // 2. ป้อน id ลงไปให้ useShow แบบเจาะจง
  const { query } = useShow<any>({
      resource: "properties",
      id: id  // <--- เติมบรรทัดนี้เข้าไปครับ!
  });

  const { mutate } = useDelete<any>();


  const {data, isLoading, isError} = query;
  console.log(data);
  const Properties = data?.data??{};

  const isCurrentUser = user?.email === Properties?.creator?.email;
  const handleDeleteProperty = () => {
    const response = window.confirm("Are you sure you want to delete this property?");
    if (response) {
        mutate({
          resource: "properties",
          id:id as string, 
        }, {
          onSuccess: () => {
            navigate("/Properties");
          }
      });
    }
  }
  if (isLoading) return <Typography>Loading details...</Typography>;
  if (isError) return <Typography>Error loading details</Typography>;
  return (
    <Box
    
      borderRadius={"15px"}
      padding={"10px"}
      bgcolor={"#fcfcfc"}
      width="100%"
      > 
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        {/* ปุ่มลูกศรย้อนกลับ */}
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        
        {/* หัวข้อ Detail */}
        <Typography fontSize={25} fontWeight={500} color='#11142d'>
          Detail
        </Typography>
      </Stack>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', lg: 'row' }}
        justifyContent={'space-between'}
        gap={10}
        mt={"10px"}
      >
        <Box
        flex={1}
        width={"100%"}
        
        >
          <img
            src={Properties.photos}
            alt={Properties.title}
            width={"100%"}
            height= {546}
            style={{ objectFit: "cover", borderRadius: "10px",width: "100%", 
              height: "auto"}}
          />
          <Box
          mt={"15px"}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Typography 
              fontSize={18} 
              fontWeight={500} 
              color='#11142d'
              textTransform={"capitalize"}
              >
                 {Properties.propertyType}
            </Typography>
            <Box>
              {[1,2,3,4,5].map((i) => (
                <Star 
                key={i}
                sx={{ color: "#f2c94c" }}
                /> ))}
            </Box>
            </Stack>
            <Stack 
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
             <Box>
              <Typography 
              fontSize={18} 
              fontWeight={500} 
              color='#11142d'
              textTransform={"capitalize"}
              >
                {Properties.title}
            </Typography>
            <Stack 
              mt={0.5}
              direction={"row"}
              alignItems={"center"}
              gap={0.5}
            >
              <Place sx={{ color: "#808191" }} />
              <Typography 
                fontSize={14} 
                color='#11142d'
              >
                {Properties.location}
              </Typography>
            </Stack>
              </Box> 
            
            <Box>
              <Typography 
              fontSize={16} 
              fontWeight={500} 
              color='#11142d'
              textTransform={"capitalize"}
              >
                Price
            </Typography>
            <Stack
            direction={"row"}
            alignItems={"flex-end"}
            gap={1}
            >
              <Typography 
              fontSize={25} 
              fontWeight={600} 
              color='#475be8'
              >
                {Number(Properties.price).toLocaleString()} Baht
            </Typography>
            <Typography 
              fontSize={14} 
              color='#808191'
              mb={0.5}
              >
                for monthly rent
            </Typography>
            </Stack>
            </Box>
            </Stack>
            <Stack
            direction={"column"}
            alignItems={"flex-start"}
            gap={1}
            >
              <Typography 
              fontSize={16} 
              fontWeight={600} 
              color='#808191'
              fontFamily={"Inter"}
              >
                {Properties.description}
            </Typography>
            </Stack>
          </Box>
        </Box>
        <Box
        flex={1}
        maxWidth={{ xs: "100%", lg: "380px"}}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        >
          <Stack
          p={2}
          width={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          border={"1px solid #f4f4f4"}
          >
            <Stack
            mt={2}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            >
              <img src={
                checkImage(Properties.creator.avatar)?
                Properties.creator.avatar
                :"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              } 
              alt={Properties.creator.name} 
              width={90}
              height={90}
              style={{ borderRadius: "100%", objectFit: "cover" }}
              />
              <Box
              mt={"15px"}
              >
                <Typography 
              fontSize={16} 
              fontWeight={600} 
              color='#11142d'
              >
                {Properties.creator.name}
            </Typography>
              <Typography 
              mt={"2px"}
              fontSize={14} 
              fontWeight={600} 
              color='#808191'
              >
                Agent
            </Typography>
              </Box>
              <Stack
              mt={"15px"}
              >
                <Typography 
              mt={"1px"}
              fontSize={16} 
              fontWeight={600} 
              color='#11142d'
              >
                <Place sx={{ color: "#0613c9" }} />
                Bangkok, Thailand
            </Typography>
            <Typography 
              mt={"1px"}
              fontSize={16} 
              fontWeight={600} 
              color='#11142d'
              >
                {Properties.creator.allProperties.length-1} Properties
            </Typography>
              </Stack>
              <Stack
              width={"100%"}
              mt={"25px"}
              direction={"row"}
              flexWrap={"wrap"}
              gap={2}
              >
                <CustomButton 
                title={isCurrentUser? "Edit" : "Message"}
                backgroundColor= "#475be8" 
                color="#fcfcfc"
                  fullWidth
                  icon={isCurrentUser ? <Edit /> : <ChatBubble />}
                  handleClick={() => {
                    navigate(`/Properties/edit/${Properties._id}`)
                  }}
                />
                <CustomButton 
                title={isCurrentUser? "Delete" : "Call"}
                backgroundColor= {isCurrentUser ? "#e52727" : "#2ED480"}
                color="#fcfcfc"
                  fullWidth
                  icon={isCurrentUser ? <Delete /> : <Phone />}
                  handleClick={() => {
                    if(isCurrentUser) {handleDeleteProperty();}
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <img src="https://f.ptcdn.info/394/059/000/pe0xespdj5By1YzI8Cw-o.png"
            alt="map"
            />
          </Stack>
          <CustomButton 
                title="Book Now"
                backgroundColor= "#475be8"
                color="#fcfcfc"
                  fullWidth
                />
        </Box>
      </Box>
    </Box>
  )
}

export default PropertiesDetail;