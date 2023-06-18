import React from "react";
import { Checkbox, Button, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const CheckMarkNav = ({ services, handleCheckboxChange, handleSubmit,state}) => {
    const navigate = useNavigate();
    
  return (
    <div style={{ width:"100%",padding:"10px 0" }}>
      <div >
        <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="cookingFuel"
            checked={services.cookingFuel}
            onChange={handleCheckboxChange}
          />}
          label="Cooking Fuel"
        />

        <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="sanitation"
            checked={services.sanitation}
            onChange={handleCheckboxChange}
          />}
          label="Sanitation"
        />

        <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="drinkingWater"
            checked={services.drinkingWater}
            onChange={handleCheckboxChange}
          />}
          label="Drinking Water"
        />

        <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="electricity"
            checked={services.electricity}
            onChange={handleCheckboxChange}
          />}
          label="Electricity"
        />

        <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="house"
            checked={services.house}
            onChange={handleCheckboxChange}
          />}
          label="House"
        />

        {/* <FormControlLabel
          style={{display:'block'}}
          control={<Checkbox
            name="assets"
            checked={services.assets}
            onChange={handleCheckboxChange}
          />}
          label="Assets"
        /> */}

        <Button
              style={{ margin:"10px 0", background: '#fbe400', color: '#000000'}}
        
        variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

    </div>
  );
};

export default CheckMarkNav;
