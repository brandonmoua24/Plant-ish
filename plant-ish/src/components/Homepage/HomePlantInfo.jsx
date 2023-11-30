import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './HomePlantInfo.css';
import axios from 'axios';


const HomePlantInfo = () => {
  const [plant, setPlant] = useState({});
  const { id } = useParams();

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
      <div className="home-plant-info-container">

        <div className="home-plant-info-details">
          <h3 className="home-plant-info-name">{plant.name}</h3>
          <img className="home-plant-info-img" src={plant.imageUrl} alt={plant.name} />
          <div className='home-plant-info-text'>
            <strong>Description:</strong> {plant.description}<br />
            <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
            <strong>Rating:</strong> {plant.rating}<br />
            <strong>Price:</strong> ${plant.price}<br />
          </div>
          <Link to='/' className="home-plant-info-link-button">Exit Plant Information Page</Link>
        </div>
      </div>
    </>
  );
};

export default HomePlantInfo;
