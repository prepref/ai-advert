import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "../App.css";

const DropdownInput = ({ label, value, onChange, options, className }) => {
  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownInput;