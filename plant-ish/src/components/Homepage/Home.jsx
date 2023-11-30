import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className='home-header'>
        Browse indoor plants!
      </div>
      <div className="home-pageinfo">
        Browse a wide variety of indoor house plants. Login for a personalized experience, bringing member exclusive content and capabilities.


        <div className="home-search-tool">
          <div className="home-search">
            <input
              className='home-search-input'
              type="text"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="home-search-button" onClick={handleSearch}>Search</button>
            <button className="home-search-button" onClick={handleClearSearch}>Clear</button>
          </div>
        </div>
        <div className="home-plant-header"><h3>Featured Plants:</h3></div>
        <div className="home-plant-container">
          {plants.map((plant) => (
            <Link key={plant._id} to={`/homeplantinfo/${plant._id}`}>
            <div key={plant._id} className="home-plant-card">
              <img src={plant.imageUrl} alt={plant.name} />
              <div className="home-plant-details">
                <strong>Name:</strong> {plant.name}<br />
                <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
                <strong>Rating:</strong> {plant.rating}<br />
                <strong>Price:</strong> ${plant.price}<br />
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
