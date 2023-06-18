import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddFamily = () => {
  const [emergencyContact, setEmergencyContact] = useState("");
  const [cookingFuel, setCookingFuel] = useState(false);
  const [sanitation, setSanitation] = useState(false);
  const [drinkingWater, setDrinkingWater] = useState(false);
  const [electricity, setElectricity] = useState(false);
  const [house, setHouse] = useState(false);
  const [assets, setAssets] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(state.community);

    const data = {
      familyId: emergencyContact,
      community: state.community,
      cookingFuel,
      sanitation,
      drinkingWater,
      electricity,
      house,
      assets,
    };

    axios
      .post("http://localhost:4421/add-familydetails", data)
      .then((response) => {
        navigate("/community-families", {
          state: {
            communityData: data.community,
          },
        });
        console.log("successfull");
      })
      .catch((error) => {
        console.error("Failed to retrieve Community data:", error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <h2>Add Family</h2>
      <div style={formGroupStyle}>
        <label htmlFor="emergencyContact">Emergency Contact Mobile:</label>
        <input
          type="text"
          id="emergencyContact"
          value={emergencyContact}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(inputValue && inputValue.length <= 10)) {
              setEmergencyContact(inputValue);
            }
          }}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Check the services available:</label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={cookingFuel}
              onChange={(e) => setCookingFuel(e.target.checked)}
              style={checkboxStyle}
            />
            Cooking Fuel
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={sanitation}
              onChange={(e) => setSanitation(e.target.checked)}
              style={checkboxStyle}
            />
            Sanitation
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={drinkingWater}
              onChange={(e) => setDrinkingWater(e.target.checked)}
              style={checkboxStyle}
            />
            Drinking Water
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={electricity}
              onChange={(e) => setElectricity(e.target.checked)}
              style={checkboxStyle}
            />
            Electricity
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={house}
              onChange={(e) => setHouse(e.target.checked)}
              style={checkboxStyle}
            />
            House
          </label>
        </div>{" "}
        <div>
          <label>
            <input
              type="checkbox"
              checked={assets}
              onChange={(e) => setAssets(e.target.checked)}
              style={checkboxStyle}
            />
            Assets
          </label>
        </div>
      </div>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

// Inline CSS styles
const formStyle = {
  width: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const checkboxStyle = {
  marginRight: "5px",
};

const buttonStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const specificationTextStyle = {
  margin: "5px 0",
};

export default AddFamily;