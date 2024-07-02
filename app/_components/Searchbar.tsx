"use client";

import { storeResults } from "@/app/_lib/actions";
import React, { useState, useRef } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { Box, InputAdornment, TextField, Button } from "@mui/material";
import Select, { components } from "react-select";

const fileTypeOptions = [
  { value: "all", label: "All", icon: <SearchIcon /> },
  { value: "pdf", label: "PDF", icon: <PictureAsPdfIcon /> },
  { value: "doc", label: "DOC", icon: <DescriptionIcon /> },
  { value: "xls", label: "XLS", icon: <GridOnIcon /> },
  { value: "ppt", label: "PPT", icon: <SlideshowIcon /> },
];

const Searchbar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectValue(selectedOption.value);
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

  const Option = (props: any) => (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.data.icon}
        <span style={{ marginLeft: "8px" }}>{props.data.label}</span>
      </div>
    </components.Option>
  );

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
      <Select
        name="file_type"
        value={fileTypeOptions.find((option) => option.value === selectValue)}
        onChange={handleSelectChange}
        options={fileTypeOptions}
        components={{ Option }}
        placeholder="File Type"
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: "24px",
            minWidth: "120px",
            height: "56px",
          }),
          valueContainer: (provided) => ({
            ...provided,
            height: "56px",
            display: "flex",
            alignItems: "center",
          }),
          singleValue: (provided) => ({
            ...provided,
            margin: "0 8px",
          }),
        }}
      />
    </Box>
  );
};

export default Searchbar;
