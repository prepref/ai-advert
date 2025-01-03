import React from "react";
import { Slider, Typography } from "@mui/material";

const SliderInput = ({ label, value, onChange, min, max, step }) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default SliderInput;