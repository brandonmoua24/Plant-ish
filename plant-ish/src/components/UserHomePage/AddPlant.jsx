import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddPlant.css';
import axios from "axios";

const AddPlant = () => {
  const navigate = useNavigate();
  const [plantData, setPlantData] = useState({
    name: "",
    description: "",
    maintenancelvl: 0,
    rating: 0,
    price: 0,
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8008/api/plant", plantData);

      console.log("Plant added successfully!");
    } catch (error) {
      console.error("Error adding plant:", error.message);
    }
    navigate('/userhomepage');
  };

  useEffect(() => {
    document.body.classList.add('body-logged-in');
    return () => {
      document.body.classList.remove('body-logged-in');
    };
  }, []);

  return (
    <div className="add-plant-container">
      <h2>Add plant:</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={plantData.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={plantData.description}
          onChange={handleChange}
          required
        />

        <label>Maintenance Level:</label>
        <input
          type="number"
          name="maintenancelvl"
          value={plantData.maintenancelvl}
          onChange={handleChange}
          required
        />

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={plantData.rating}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={plantData.price}
          onChange={handleChange}
          required
        />

        <label> Image URL:</label>
        <input
          type="url"
          name="imageUrl"
          value={plantData.imageUrl}
          onChange={handleChange}
          required
          className="add-plant-input"
        />

        <br />

        <button type="submit">Add Plant</button>
        <Link to="/userhomepage">
          <button>Exit</button>
        </Link>
      </form>
    </div>
  );
};

export default AddPlant;
