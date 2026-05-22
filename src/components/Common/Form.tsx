import { Box, Typography, FormControl, FormHelperText, TextareaAutosize, TextField, Button, Stack, MenuItem, Select } from '@mui/material';
import { FormProps } from '../../interfaces/home';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import CustomButton from './CustomButton';

const Form = ({
  type,
  register,
  formLoading,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  propertyImage,
}: FormProps) => {
  // 1. ประกาศตัวแปร navigate
  const navigate = useNavigate();

  return (
    <Box>
      {/* 2. จัดกลุ่มปุ่มย้อนกลับและข้อความให้อยู่แนวนอนเดียวกัน */}
      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton 
          onClick={() => navigate('/Properties')} 
          sx={{ color: '#11142d' }} // กำหนดสีให้เข้ากับตีม
        >
          <ArrowBack />
        </IconButton>
        
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {type} a Property
        </Typography>
      </Stack>

      <Box
        mt={2.5}
        borderRadius={15}
        padding="20px"
        bgcolor='#fcfcfc'
      >
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0",
                color: "#11142d"
              }}
            >
              Enter Property Name
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              placeholder='Enter Property Name'
              {...register("title", { required: true })}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                },
              }}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0",
                color: "#11142d"
              }}
            >
              Enter Property description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="please insert Property description"
              {...register("description", { required: true })}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                borderColor: "rgba(0, 0, 0, 0.23)",
                borderRadius: "6px",
                padding: "10px",
                color: "#919191",
                fontFamily: "inherit", // แนะนำให้ใส่เพิ่มเพื่อไม่ให้ฟอนต์เพี้ยน
              }}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0",
                color: "#11142d"
              }}>
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                sx={{ textTransform: "capitalize" }}
                defaultValue="apartment"
                {...register("propertyType", { required: true })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="condo">Condo</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
                <MenuItem value="resort">Resort</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }}> {/* เพิ่ม flex: 1 ให้ช่องราคากว้างเท่ากับช่องประเภท */}
              <FormHelperText
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  margin: "10px 0",
                  color: "#11142d"
                }}
              >
                Enter Property Price
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                placeholder='Enter Price'
                type="number" // แนะนำให้ใส่เป็นตัวเลข
                {...register("price", { required: true })}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                  },
                }}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "10px 0",
                color: "#11142d"
              }}
            >
              Enter Property Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              color="info"
              variant="outlined"
              placeholder='Enter Location'
              {...register("location", { required: true })}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#000000",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                },
              }}
            />
          </FormControl>

          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            mb={2}
          >
            <Stack
              direction="row"
              gap={2}
            >
              <Typography color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
              </Typography>
              <Button component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleImageChange(e.target.files[0]);
                    }
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{
                wordBreak: "break-all"
              }}
            >
              {propertyImage?.name || "No file selected"}
            </Typography>
          </Stack>

          <CustomButton  
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            color='#fcfcfc'
            backgroundColor="#475be8"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form;