import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home2";
import Login from "./components/Login";
import Team from "./components/Tables/ManageStaff";
import Invoices from "./components/Tables/Manageprograms";
import CommunityProfile from "./pages/CommunityProfile";
import Form from "./components/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import Calendar from "./components/calendar";
import AddStaff from "./components/AddStaff";
import DeleteStaff from "./components/DeleteStaff";
import ManageUser from "./components/Tables/ManageUser";
import AddUser from "./components/AddUser";
import ManageCommunity from "./components/Tables/ManageCommunity";
import AddCommunity from "./components/AddCommunity";
import AddEvent from "./components/AddEvent";
import EventDetails from "./components/Tables/EventDetails";
import CommunityFamilies from "./components/Tables/CommunityFamilies";
import AddFamily from "./components/AddFamily";
import UserInfo from "./pages/UserInfo";
import FamilyInfo from "./pages/FamilyInfo";
import ManageEvent from "./components/Tables/ManageEvents";
import Registration from "./pages/Registration";
import DeleteEvent from "./components/DeleteEvent";
import InfoPage from "./pages/EventInfoPage";
import { Box } from "@mui/material";
import AddUser2 from "./components/FamilyInfo/AddUser";
import Attendance from "./pages/Attendance";



function App() {
  const [theme] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const shouldRenderSidebar =
    location.pathname !== "/" && location.pathname !== "/login" &&location.pathname!=="/Registration"&&location.pathname!=="/info";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {shouldRenderSidebar && <Sidebar isSidebar={isSidebar} />}
        <main className="content">
          {/* {shouldRenderSidebar && <Topbar setIsSidebar={setIsSidebar} />} */}
          <Box>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/manage-community" element={<ManageCommunity />} />
            <Route path="/community-families" element={<CommunityFamilies />} />
            <Route path="/community-profile" element={<CommunityProfile />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* CRUD */}
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/Delete-staff" element={<DeleteStaff />} />
            <Route path="/add-user" element={<AddUser2 />} />
            <Route path="/add-community" element={<AddCommunity />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/event" element={<EventDetails />} />
            <Route path="/add-family" element={<AddFamily />} />
            <Route path="/member-info" element={<UserInfo />} />
            <Route path="/family-info" element={<FamilyInfo />} />


            {/* Nitin Patel */}
            <Route path="/manage-event" element={<ManageEvent/>} />
            <Route path="/event-details" element={<EventDetails/>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/delete-event" element={<DeleteEvent/>}/>
            <Route path="/info" element={<InfoPage/>}/>
            {/* <Route path="/check" element={<AddUser/>}/> */}
            <Route path="/attendance" element={<Attendance/>}/>
          </Routes>
          </Box>

        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
