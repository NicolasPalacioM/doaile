"use client";

import { Box } from "@mui/material";
import { NextPage } from "next";
import Searchbar from "./Searchbar";
import Title from "./Title";

const Search: NextPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Title />
      <Searchbar />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      ></Box>
    </Box>
  );
};

export default Search;
