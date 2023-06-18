import React, { useState } from "react";
import { Card, CardContent, Typography, Box, useTheme, Button } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { tokens } from "../theme";

const AccordionCard = ({ title, content }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  // const [isExpanded, setExpanded] = useState(false);

  // const handleCardClick = () => {
  //   setExpanded(!isExpanded);
  // };

  return (
    <Card
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "56px",
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
        }}
      >
        <Typography variant="h4" fontWeight="600" color={colors.greenAccent[500]}>
          {title}
        </Typography>
      </Box>
      
    </Card>
  );
};

export default AccordionCard;
