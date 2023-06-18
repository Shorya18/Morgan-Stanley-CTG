import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Snackbar, Alert, AlertTitle } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCommunity = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [openAlert, setAlertOpen] = useState(false);
  const [message, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  
  const openAlertToast = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertType('');
    setAlertMsg('');
    setAlertOpen(false);
  };

  useEffect(() => {
    openAlertToast();

  }, [message, alertType]);


  const handleFormSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      startDate: values.startDate.split("T")[0],
    };
    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "http://localhost:4421/add-Community",
      data,
    })
      .then((res) => {
        console.log(res);
        setAlertType('success');
        setAlertMsg("Community added successfully!");
   
        navigate("/manage-community");
      })
      .catch((err) => {
        // alert("bad");
        setAlertType('error');
        setAlertMsg("There was some issue in processing your request. Please try again later.");
        console.log(err);
      });
    console.log(values);
  };

  return (
    <Box m="20px" p="40px">
       {message && (<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity={alertType} variant="filled"  sx={{ width: '100%' }}>
                  <AlertTitle>{alertType}</AlertTitle>
                    {message}
              </Alert>
          </Snackbar>)}

          <Box
            style={{ width: '100%'}}

            >
                  <Header title="Create Community" subtitle="Create a New Community" />
            </Box>
      <Formik
      
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="startDate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                backgroundColor="#f0f0f0"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained"
              style={{ background: '#fbe400', color: '#000000'}}

              >
                Create New Community
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  numberOfActivities: yup.string(),
  startDate: yup.string().required("required"),
});
const initialValues = {
  name: "",
  description: "",
  numberOfActivities: "",
  startDate: "",
};

export default AddCommunity;
