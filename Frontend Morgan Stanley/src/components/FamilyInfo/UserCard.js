import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Male, Female } from "@mui/icons-material";

export default function UserDetailCard(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [indivisual_id, setIndividual_id] = useState();
  const handleButtonClick = () => {
    // Update the individual_id state here if needed
    // ...
    setIndividual_id(props.name);
    //console.log(indivisual_id);
    // Navigate to 'http://localhost:3000/member-info'
    navigate(`/member-info`, {
      state: { adharcard: props.adhar,
      communityData:props.info.communityData,
      familyId:props.info.familyId
       },
    });
  };

  return (
    <Card
      sx={{ display: "flex", margin: "15px", justifyContent: "space-between" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Family Name
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b style={{ fontSize: "15px" }}>{props.name.toUpperCase()}</b>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b style={{ fontSize: "15px" }}>Age:</b><span style={{ fontSize: "15px", color: "#333" }}>{props.age}</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" display="flex" alignItems="center">
      <b style={{ marginRight: "10px" }}>Gender:</b>
      {props.gender === "Male" ? (
        <Male style={{ fontSize: "20px" }} />
      ) : (
        <Female style={{ fontSize: "20px" }} />
      )}
    </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button 
                style={{ background: '#fbe400', color: '#000000'}}
          
          variant="text" onClick={handleButtonClick}>
            View Details
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 130 }}
        image="../../assets/user.png"
        alt="Live from space album cover"
      />
    </Card>
  );
}
