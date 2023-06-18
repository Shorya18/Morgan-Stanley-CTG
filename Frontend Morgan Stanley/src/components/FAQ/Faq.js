import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./Faq.css";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Faq() {
  const [expanded, setExpanded] = React.useState();
  const [expanded2, setExpanded2] = React.useState();
  const [expanded3, setExpanded3] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChange2 = (panel) => (event, newExpanded2) => {
    setExpanded2(newExpanded2 ? panel : false);
  };
  const handleChange3 = (panel) => (event, newExpanded3) => {
    setExpanded3(newExpanded3 ? panel : false);
  };
  return (
    <div style={{marginTop:"35px"}}>
      <div className="faqhead">Frequently Asked Questions</div>
      <div className="faq">
        <StyledAccordion 
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <StyledAccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
          >
            <Typography variant="h4">How can I register for an event?</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography variant="h5">
              <li>Visit our website and navigate to the Events section.</li>
              <li>Find the event you are interested in and click on it to view the event details.</li>
              <li>Look for the registration or RSVP button and click on it.</li>
              <li>Fill out the registration form with your name, contact information, and any other required details.</li>
              <li>Submit the form to complete your registration. You will receive a confirmation email with further instructions, if applicable.</li>
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
        <StyledAccordion
          expanded2={expanded2 === "panel2"}
          onChange={handleChange2("panel2")}
        >
          <StyledAccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
          >
            <Typography variant="h4">How can I contribute to the community support initiatives?</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography variant="h5">
              We appreciate your willingness to contribute to our community support initiatives. There are several ways you can get involved:

              <li>Volunteer: Join our volunteer program and contribute your time and skills to various projects and activities.</li>
              <li>Donations: Consider making a financial contribution to support our programs and services. We accept donations through our website or in-person at our office.</li>
              <li>Spread Awareness: Help us raise awareness by sharing information about our initiatives on social media, attending community events, and encouraging others to get involved.</li>
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
        <StyledAccordion
             expanded3={expanded3 === "panel3"}
             onChange={handleChange3("panel3")}
        >
          <StyledAccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
          >
            <Typography variant="h4">How can I get involved in volunteering?</Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography variant="h5">
            To get involved in volunteering:

              <li>Research local organizations.</li>
              <li>Reach out to them.</li>
              <li>Attend volunteer orientations.</li>
              <li>Offer your skills and time.</li>
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
        
      </div>
    </div>
  );
}
