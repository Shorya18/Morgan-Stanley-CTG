const express = require("express");
const mongoose = require("mongoose");
require("./db/connection");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = 4421;

const { UserAdd } = require("./Routes/Users/addUser");
const { adminLogin } = require("./Routes/Admin/adminLogin");
const { staffAdd } = require("./Routes/Staff/AddStaff");
const { staffDelete } = require("./Routes/Staff/DeleteStaff");
const { staffDetails } = require("./Routes/Staff/getStaffDetails");
const { CommunityAdd } = require("./Routes/Program/AddProgram");
const { CommunityDelete } = require("./Routes/Program/DeleteProgram");
const { CommunityDetails } = require("./Routes/Program/getProgramDetails");
const { EventAdd } = require("./Routes/Events/AddEvent");
const { EventDelete } = require("./Routes/Events/DeleteEvent");
const { EventDetails } = require("./Routes/Events/DetailEvent");
const { UserDetailsAdd } = require("./Routes/Users/addUserDetails");
const { UserDetails } = require("./Routes/Users/GetUserDetails");
const { ProgramUserDetails } = require("./Routes/Program/getProgramUsers");
const { uniqueCommunities } = require("./Routes/Program/getUniqueProgram");
const { uniqueStaff } = require("./Routes/Staff/getUniqueStaff");
const { addFamilyDetails } = require("./Routes/Family/addFamilyDetails");
const { getAllFamily } = require("./Routes/Family/getAllFamily");
const { adminadd } = require("./Routes/Admin/adminadd");

const { EventDetailsInactive } = require("./Routes/Events/DetailEventInactive");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home route!");
});

app.use("/add-user", UserAdd);
app.use("/admin-login", adminLogin);
app.use("/add-Staff", staffAdd);
app.use("/delete-Staff", staffDelete);
app.use("/details-staff", staffDetails);
app.use("/add-Community", CommunityAdd);
app.use("/delete-Community", CommunityDelete);
app.use("/details-Community", CommunityDetails);
app.use("/add-Event", EventAdd);
app.use("/delete-Event", EventDelete);
app.use("/details-Event", EventDetails);
app.use("/add-userdetails", UserDetailsAdd);
app.use("/get-userdetails", UserDetails);
app.use("/program-userdetails", ProgramUserDetails);
app.use("/unique-communities", uniqueCommunities);
app.use("/unique-staff", uniqueStaff);
app.use("/details-Event-inactive", EventDetailsInactive);

app.use("/get-communityfamily", getAllFamily);
app.use("/add-familydetails", addFamilyDetails);
app.use("/add-admin", adminadd);

app.get("/about", (req, res) => {
  res.send("this is my about route");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
