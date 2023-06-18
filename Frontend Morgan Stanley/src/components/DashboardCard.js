import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

export default function DashboardCard(props) {
  const navigate = useNavigate();

 const mpiscore= props.mpi;
  // Define the color based on MPI score
  let cardColor = '#cef5f4';
  if (mpiscore > 0.7) {
    cardColor = '#fce3e5'; 
  } else if (mpiscore >= 0.5) {
    cardColor = '#fcfc99'; 
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: '#f0f0f0',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        navigate("/community-profile", {
          state: {
            community: props.communityName,
          },
        })
      }
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%'}}>
          <Typography gutterBottom variant="h4" component="div">
            <span style={{letterSpacing: '0.8px', fontWeight: 700, textTransform: 'uppercase'}}>{props.communityName}</span>
            <Typography variant="h5" color="text.primary">
              {props.description}
            </Typography>
          </Typography>

        <Typography variant="h4" color="text.primary" style={{
        backgroundColor: cardColor,
          padding: "4px",
          width: 'max-content',
          borderRadius: '12px'
        }}>
          Global MPI: <span >{mpiscore}</span>
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
