const route = require("express").Router();
const moment = require("moment");
const Event = require("../../model/EventSchema");

// to login into admin account
route.post("/", async (req, res) => {
  const EventDetails = {
    nameOfActivity: req.body.nameOfActivity,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    venue: req.body.venue,
    theme: req.body.theme,
    capacity: req.body.capacity,
    description: req.body.description,
    invitedCommunity: req.body.invitedCommunity,
    assignedStaff: req.body.assignedStaff,
    duration: req.body.duration,
    startTime: req.body.startTime,
  };

  const curr_date = moment();
  const date_L = moment(EventDetails.startDate);
  const date_M = moment(EventDetails.endDate);

  if(date_L < curr_date ) {
    res.send("Date");
  }
  else if(date_L > date_M) {
    res.send("Date");
  }
  else if(EventDetails.description.length < 20){
    res.send("Description");
  }
  else {
    const newEventMember = new Event(EventDetails);
    try{
      const savedEvent = await newEventMember.save();
      console.log("Event Added");
      res.send("new Event Added");
    }
    catch (err) {
      console.log(err);
      res.status(400).send("Event was not registered , some error occured");
    }
  }
});


exports = module.exports = {
  EventAdd: route,
};
