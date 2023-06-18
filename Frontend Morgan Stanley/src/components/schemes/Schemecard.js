import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


export default function SchemeCard(EventName) {
  const navigate = useNavigate();
  return (
    <Box sx={{width: "30%", margin: "10px"}}>
      <Card variant="outlined" sx={{ borderRadius: "10px"}}>
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
            {EventName.EventName}
          </Typography>
          <hr />
          <Typography variant="h5" component="div">
            <label style={{fontWeight: "bold"}}>StartDate: </label>
            {EventName.StartTime.split('T')[0]}
          </Typography>
          <Typography variant="h5" component="div">
            <label style={{fontWeight: "bold"}}>Venue: </label>
            {EventName.Venue}
          </Typography>
          <Typography variant="h5" component="div">
            <label style={{fontWeight: "bold"}}>Theme: </label>
            {EventName.Theme}
          </Typography>
          {/* <Typography variant="body2">
            <ul>
            {EventName.Invited.map(Event => (
              <li>
                {Event}
              </li>
            ))}
            </ul>
          </Typography> */}
          <Typography variant="h5" component="div">
            <label style={{fontWeight: "bold"}}>Description: </label>
            {EventName.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={()=>{
            navigate("/info", {
              state: {
                Event_Reg_Id: EventName.Event_id
              },
            })
          }} variant="contained">Info</Button>
          <Button onClick={() => {
            console.log(EventName.Event_id);
                navigate("/Registration", {
                  state: {
                      Event_Reg_Id: EventName.Event_id
                  },
                });
              }} variant="contained">Register</Button>
        </CardActions>
      </React.Fragment>
      </Card>
    </Box>
  );
}
