const route = require('express').Router()
const Event = require("../../model/EventSchema");


// to login into admin account
route.post("/", async (req, res) => {
    const EventDetails = {
        _id: req.body._id,
    };
    // console.log(adminDetails);

    const ExistingEvent = await Event.findOne({ _id: EventDetails._id, Flag: true});
    try {
        if (ExistingEvent) {
                ExistingEvent.Flag = false;
                await ExistingEvent.save();
                console.log("Event Deleted");
                res.send('Event Deleted');
        } else {
        // Creating a new User object
            console.log("Event Does Not Exist");
            res.send('Event Does Not Exist');
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Event was not Delete , some error occured");
    }
  });

exports = module.exports = {
    EventDelete: route
}