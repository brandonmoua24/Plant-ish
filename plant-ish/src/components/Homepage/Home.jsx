import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/plant');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error.message);
      }
    };

    fetchPlants();
  }, []); 

  return (
    <>
      <div className='header'>
        Browse indoor plants!
      </div>
      <div className='body'>
        Browse a wide variety of indoor house plants. Login for a personalized experience, bringing member exclusive content and capabilities.

        <h3>Featured Plants:</h3>
        <div className="plant-container">
          {plants.map((plant) => (
            <div key={plant._id} className="plant-card">
              <img src={plant.imageUrl} alt={plant.name} />
              <div className="plant-details">
                <strong>Name:</strong> {plant.name}<br />
                <strong>Description:</strong> {plant.description}<br />
                <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
                <strong>Rating:</strong> {plant.rating}<br />
                <strong>Price:</strong> ${plant.price}<br />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
