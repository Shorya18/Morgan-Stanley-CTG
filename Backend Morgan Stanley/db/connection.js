const mongoose = require("mongoose");

//connect to Mongodb
const dbURI =
  "mongodb+srv://np68175:np68175@cluster0.uzwqfqr.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err);
  });
