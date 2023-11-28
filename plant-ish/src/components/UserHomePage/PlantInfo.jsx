import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../LogIn/AuthProvider';
import axios from 'axios';
import './PlantInfo.css';

const PlantInfo = () => {
  const [plant, setPlant] = useState({});
  const auth = useAuth();
  const isLoggedIn = auth && auth.accessToken;
  const { id } = useParams();

  useEffect(() => {
    document.body.className = isLoggedIn ? 'body-logged-in' : 'body-logged-out';

    return () => {
        document.body.className = '';
    };
  }, [isLoggedIn]);

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

  return (
    <>
      <div className="plant-info-container">

        <div className="plant-details">
          <h3 className="plant-name">{plant.name}</h3>
          <img className="plant-info-img" src={plant.imageUrl} alt={plant.name} />
            <strong>Description:</strong> {plant.description}<br />
            <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
            <strong>Rating:</strong> {plant.rating}<br />
            <strong>Price:</strong> ${plant.price}<br />
          <Link to='/userhomepage' className="link-button">Exit Plant Information Page</Link>
        </div>
      </div>
    </>
  );
};

export default PlantInfo;
