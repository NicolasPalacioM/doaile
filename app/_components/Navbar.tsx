"use client";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";

interface ResponsiveAppBarProps {
  children?: React.ReactNode;
  bgColor?: "primary" | "secondary" | "default" | "inherit" | "transparent";
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({
  children,
  bgColor = "primary",
}) => {
  return (
    <AppBar position="static" color={bgColor}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
            justifyContent: {
              xs: "center",
              sm: `${children ? "space-between" : "center"}`,
            },
            alignItems: "center",
          }}
        >
          <Logo type={children ? "primary" : ""} />
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
