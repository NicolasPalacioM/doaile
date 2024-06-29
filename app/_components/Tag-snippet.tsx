"use client";

import { Typography } from "@mui/material";
import theme from "../theme";
import React from "react";

const TagSnippet: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        color: theme.palette.grey[600],
        margin: "0.5rem",
      }}
    >
      {children}
    </Typography>
  );
};

export default TagSnippet;
