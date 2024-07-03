"use client";
import { storeResults } from "@/app/_lib/actions";
import React, { useState, useRef } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  InputAdornment,
  TextField,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { fileTypeOptions } from "@/app/_lib/fileTypes";

const Searchbar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("pdf");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("search", inputValue);
    formData.append("file_type", selectValue);
    await storeResults(formData);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 2,
        margin: "1rem 0",
      }}
    >
      <TextField
        name="search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        label="Search"
        sx={{
          width: { xs: "100%", sm: "600px" },
          "& .MuiOutlinedInput-root": {
            borderRadius: "24px",
            paddingRight: "8px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #c4c4c4",
          borderRadius: "24px",
          padding: "0 16px",
          cursor: "pointer",
          height: "56px",
          "&:hover": {
            borderColor: "#000",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {fileTypeOptions.find((option) => option.value === selectValue)?.icon}
          <Typography sx={{ ml: 1 }}>
            {
              fileTypeOptions.find((option) => option.value === selectValue)
                ?.label
            }
          </Typography>
        </Box>
        <ArrowDropDownIcon />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        marginThreshold={-20}
        slotProps={{
          paper: {
            style: {
              maxHeight: "200px",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box
          sx={{
            maxHeight: "300px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "4px",
            },
          }}
        >
          <List>
            {fileTypeOptions.map((option) => (
              <ListItem
                key={option.value}
                onClick={() => handleSelectChange(option.value)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export default Searchbar;
