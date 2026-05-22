import React from 'react';
import { CustomButton, PropertyCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useTable } from '@refinedev/core';
import { Box, Typography, Stack } from '@mui/material';


const AllProperties = () => {
  const navigate = useNavigate();

  // 1. ดึง tableQueryResult ออกมาตรงๆ ก่อน ยังไม่ต้องเจาะเอา data ทันที
  const {
    tableQuery,
    currentPage,    // 👈 ใช้คำนี้แทน current
    setCurrentPage, // 👈 ใช้คำนี้แทน setCurrent
    pageCount,
    sorters,        // 👈 เติม s ตามที่เคยแก้ไปแล้ว
    setSorters,     // 👈 เติม s ตามที่เคยแก้ไปแล้ว
    filters,
    setFilters,
  } = useTable();

  // 2. ใช้เครื่องหมาย ? (Optional Chaining) เพื่อเช็คความปลอดภัยก่อนดึงข้อมูล
  // ถ้ายังโหลดไม่เสร็จ ให้เป็น array เปล่า [] ไปก่อน หน้าจอจะได้ไม่พัง
  const allProperties = tableQuery?.data?.data ?? [];
  const isLoading = tableQuery?.isLoading;
  const isError = tableQuery?.isError;

  console.log("ข้อมูลจาก Backend:", tableQuery?.data);
  // 3. จัดการ State ตอนกำลังโหลด หรือตอน Error
  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading properties</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            All Properties
          </Typography>
        </Stack>
      </Box>

      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/Properties/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Box>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.map((property: any) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photos}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;