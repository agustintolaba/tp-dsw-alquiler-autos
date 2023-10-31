'use client'
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material";
import { ReactElement, ReactNode } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const NextThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
)

export default NextThemeProvider;