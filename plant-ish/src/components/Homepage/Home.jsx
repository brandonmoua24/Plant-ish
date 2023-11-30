import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:8008/api/plant');
      setPlants(response.data);
    } catch (error) {
      console.error('Error fetching plants:', error.message);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredPlants = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPlants(filteredPlants);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchPlants();
  };

  return (
    <>
      <div className='header'>
        Browse indoor plants!
      </div>
      <div className="pageinfo">
        Browse a wide variety of indoor house plants. Login for a personalized experience, bringing member exclusive content and capabilities.


        <div className="search-tool">
          <div className="search">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
            <button className="search-button" onClick={handleClearSearch}>Clear</button>
          </div>
        </div>
        <div className="user-plant-header"><h3>Featured Plants:</h3></div>
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
