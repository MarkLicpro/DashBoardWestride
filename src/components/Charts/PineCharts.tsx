import React from 'react'
import { PineChartsProps } from '../../interfaces/home'
import { Box, Stack, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { data } from 'react-router'

const PineCharts = ({title,value,series,colors} : PineChartsProps) => {
  return (
    <Box 
    id="chart"
    flex={1}
    display="flex"
    bgcolor="#fcfcfc"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    pl={3.5}
    pr={2}
    border="1px solid #e0e0e0"
    borderRadius={"15px"}
    minHeight="110px"
    width="fit-content"
    >
<Stack direction="column">
  <Typography fontSize={14} color="#808191">{title}</Typography>
  <Typography  fontSize={24} fontWeight={600} mt={1} color="#11142d">{value}</Typography>
</Stack>
<ReactApexChart 
  options={{
  chart:  {type: "donut"},
  colors,
  legend: {show: false },
  dataLabels: {enabled: false }
}} 
  series={series} 
  type="donut" 
  width={"120px"} />
    </Box>
  )
}

export default PineCharts