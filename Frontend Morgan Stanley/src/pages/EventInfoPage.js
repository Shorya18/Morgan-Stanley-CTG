import React from 'react';
import '../components/css/addstaff.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
var moment = require('moment');


export default function InfoPage() {
  const [EventData, setEventData] = useState([]);
  const { state } = useLocation();
  const data = {
    Event_id: state.Event_id,
  };


  useEffect(() => {
      axios({
        method: "POST",
        url: "http://localhost:4421/details-Event/:id",
        data,
      })
        .then((res) => {
          console.log(res);
          const data = res.data;
          setEventData(data);
        })
        .catch((err) => {
          console.log(err);
        });

  }, []);


  useEffect(() => {
    console.log(EventData);
  }, [EventData]);
  console.log(EventData);
  const date_L = moment(EventData.startDate).format('DD MMM, YYYY');

  // const temp = EventData.startDate.split('T')[0];
  const navigate = useNavigate();
  return (
    <div className="event-info" style={{boxShadow: "5px 5px 10px grey"}}>
      <h1>{EventData.nameOfActivity}</h1>
      <div className="event-details">
        <div className="event-date">
          <h3>Date:</h3>
          <p>{date_L}</p>
        </div>
        <div className="event-location">
          <h3>Location:</h3>
          <p>{EventData.venue}</p>
        </div>
      </div>
      <div className="event-description">
        <h3>Theme</h3>
        <p>{EventData.theme}</p>
      </div>
      <div className="event-description">
        <h3>About the Event:</h3>
        <p>{EventData.description}</p>
      </div>
      <button onClick={()=>{
        navigate("/Registration", {
          state: {
              Event_Reg_Id: state.Event_Reg_Id
          },
        });
      }
      } style={{margin: "10px", backgroundColor: "green"}} className="register-button">Register Now</button>
      <button 
      
      onClick={()=>{
        
        navigate("/");
      }
      } className="register-button">Back</button>
    </div>
  );
}
