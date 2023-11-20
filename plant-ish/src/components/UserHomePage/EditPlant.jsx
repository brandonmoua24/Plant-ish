import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPlant.css';

function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState({
    name: '',
    description: '',
    maintenancelvl: '',
    rating: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/plant/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.error('Error fetching plant:', error.message);
      }
    };

    fetchPlant();
  }, [id]);

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8008/api/plant/${id}`, plant);
    } catch (error) {
      console.error('Error editing plant:', error.message);
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
    <div className='edit-plant-container'>
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={plant.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={plant.description} onChange={handleChange} required />

        <label>Maintenance Level:</label>
        <input type="text" name="maintenancelvl" value={plant.maintenancelvl} onChange={handleChange} required />

        <label>Rating:</label>
        <input type="number" name="rating" value={plant.rating} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={plant.price} onChange={handleChange} required />

        <label>Image URL:</label>
        <input type="text" name="imageUrl" value={plant.imageUrl} onChange={handleChange} required />
        <br/>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditPlant;
