import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
      axios.get("http://localhost:4421/details-Event")
			.then((response) => {
        const data = response.data;
        console.log(data);
        const dates = data.map((community) => ({
          id: community._id,
          title: community.nameOfActivity,
          date: community.startDate.split("T")[0],
        }));
				setEventData(dates);
        setIsLoading(false);
			})
			.catch((error) => {
				console.error(
					"Failed to retrieve Community data:",
					error
				);

    });
  }, []);
  const handleDateClick = (selected) => {
      navigate("/add-event");
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <div >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Loading...
        </div>
      ) : (
    <Box m="20px"
    style={{ margin: '20px'}}
    >
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between"
          backgroundColor={'#f0f0f0'}
          marginTop= '20px'
      
      >
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={'#f0f0f0'}
          p="15px"
          borderRadius="4px"
          marginTop= '20px'

        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            // eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={eventData}
          />
        </Box>
      </Box>
    </Box>
     )}
     </div>
  );
};

export default Calendar;