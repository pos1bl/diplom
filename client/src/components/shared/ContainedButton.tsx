import { FC, ReactNode } from "react";
import { Button, SxProps, Theme } from "@mui/material";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
};

export const ContainedButton:FC<Props> = ({ children, sx, ...props }) => (
  <Button
    variant="contained"
    size="large"
    sx={{
      px: 5,
      py: 1.5,
      borderRadius: 8,
      textTransform: 'none',
      backgroundColor: "#A891D2",
      fontWeight: 'bold',
      fontSize: '1rem',
      '&:hover': { backgroundColor: '#9678C1' },
      ...sx
    }}
    {...props}
  >
    {children}
  </Button>
);