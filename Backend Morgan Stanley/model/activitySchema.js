const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activity_schema = new Schema({
    nameOfActivity: {
        type: String,
        require: true,
        unique: true,
    },
    startTime: {
        type: String,
        require: true,
    },
    endTime: {
        type: String,
        require: true,
    },
    venue: {
        type: String,
        require: true,
    },
    theme: {
        type: String,
        require: true,
    },
    actualNumber: {
        type: Number,
        require: true,
    },
    capacity: {
        type: Number,
        require: true,
    },
    invitedCommunity: {
        type: [String],
        require: true,
    }
}, { timestamps: true });

const Activity = mongoose.model('Activity', activity_schema );

module.exports = Activity;

// Create Part - 
// 	Activites - 
// 	-   Name Of Activities
// 	-   Start TimeStamp 
// 	-   End Time Stamp
// 	-   Venue
// 	-   Theme String
// 	-   Actual Come to the Event - After the event Updated
// 	-   Capacity for that Activity or Event 
// 	-   Invited Community 