import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {ArrowCircleUpRounded} from '@mui/icons-material'
import ReactApexChart from 'react-apexcharts'
import { TotalRevenueSeries, TotalRevenueOptions } from './Chart.config'

const TotalRevenue = () => {
    return (
        <Box p={4}
            flex={1}
            bgcolor="#fff"
            flexDirection="column"
            borderRadius="10px">
            <Typography fontSize={18}
                fontWeight={600}
                color="#11142D">
                Total Revenue
            </Typography>
            <Stack my="20px" direction="row"
                gap={4}
                flexWrap="wrap">
                <Typography fontSize={24}
                    fontWeight={600}
                    color="#11142D">
                    $22,250
                </Typography>
                <Stack direction="row"
                    gap={1}>
                    <ArrowCircleUpRounded sx={
                        {
                            fontSize: 25,
                            color: '#475be8',
                            mt: 0.5
                        }
                    }/>
                    <Stack>
                        <Typography fontSize={12}
                            color="#475be8">
                            0.0%
                        </Typography>
                        <Typography fontSize={12}
                            color="#475be8">
                            than last month
                        </Typography>
                    </Stack>
                </Stack>
                
            </Stack>
            <ReactApexChart 
                options={TotalRevenueOptions} 
                series={TotalRevenueSeries} 
                type="bar" height={310}  />

        </Box>
    )
}

export default TotalRevenue
