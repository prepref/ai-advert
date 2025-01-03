import React from "react";
import { TextField } from "@mui/material";
import "../App.css";

const TextInput = ({ label, placeholder, value, onChange, info, readOnly, className }) => {
  return (
    <TextField
      className={className}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      slotProps={{
        input: { readOnly: readOnly}
      }}
      helperText={info}
      multiline
    />
  );
};

export default TextInput;