import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";

export type ButtonProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: any;
};
