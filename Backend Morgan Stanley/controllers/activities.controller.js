const Activity = require('../db/Activity');

const addActivity = (req, res) =>
{
    Activity.findOne({ nameOfActivity: req.body.nameOfActivity })
    .then((activityResponse) => {
        if(activityResponse != NULL)
        {
            res.status(400).json({
                message: "Activity is already listed. Please add a new activity!",
            });
            return;
        }
        else
        {
            let activity = new Activity({
                nameOfActivity: req.body.nameOfActivity,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                venue: req.body.venue,
                theme: req.body.theme,
                actualNumber: req.body.actualNumber,
                capacity: req.body.capacity,
                invitedCommunity: req.body.invitedCommunity,
            });

            activity.save().then((result) => {
                res.status(200).json({
                    message: "Activity is listed successfully!",
                });
            })
        }
    })
}