import React, { ReactNode } from 'react'
import { Button } from '@mui/material'

interface CustomButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  backgroundColor: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  color?: string;
  handleClick?: () => void;
}

const CustomButton = ({   
  type,
  title,
  backgroundColor,
  fullWidth,
  color,
  icon,
  disabled,
  handleClick 
}: CustomButtonProps) => {
  return (
   <Button 
    disabled={disabled}
    type={type === "submit" ? "submit" : "button"}
    sx={{
      flex: fullWidth ? 1 : 'unset',
      padding: '10px 15px',
      width: fullWidth ? '100%' : 'unset',
      backgroundColor,
      fontWeight: 600,
      color,
      gap: 1,
      textTransform: 'capitalize',
      "&:hover": {
        opacity: 0.9,
        backgroundColor
      }
    }
  }
  onClick={handleClick}
   >
    {icon}
    {title}
   </Button>
  )
}

export default CustomButton