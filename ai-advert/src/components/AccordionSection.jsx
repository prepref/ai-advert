import { Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip} from "@mui/material";

import ResetButton from "./ResetButton";

const AccordionSection = ({ title, children, setDefaultParameters, addButton }) => {

  return (
    <Accordion>
      <AccordionSummary
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between !important",
        alignItems: "center",
        width: "100%",
      }}>
        <Typography alignSelf="center">{title}</Typography>
        {addButton && (
          <Tooltip title="Сбросить параметры" arrow>  
            <ResetButton onConfirm={setDefaultParameters} width={24} height={24} /> 
          </Tooltip>
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;