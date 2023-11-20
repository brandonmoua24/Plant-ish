import React from 'react-dom';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ itemList }) {
  return (
    <>
      <div className='header'>
        Browse indoor plants!
      </div>
      <div className='body'>
        Browse a wide variety of indoor house plants. Login for a personalized experience, bringing member exclusive content and capabilities.
      </div>

      <div className='three-col'>
        {itemList.map((plant, index) => (
          <div key={index} className='card'>
            <div className='container'>
              <img src={plant.img} alt={plant.name} />
              <h3><b>{plant.name}</b></h3>
              <p>Maintenance Level: {plant.maintenanceLvl}</p>
              <p>Price: {plant.price}</p>
              <p>Rating: {plant.rating}</p>
            </div>
          </div>
        ))}
        {itemList.map((plant, index) => (
          <div key={index} className='card'>
            <div className='container'>
              <img src={plant.img} alt={plant.name} />
              <h3><b>{plant.name}</b></h3>
              <p>Maintenance Level: {plant.maintenanceLvl}</p>
              <p>Price: {plant.price}</p>
              <p>Rating: {plant.rating}</p>
            </div>
          </div>
        ))}
        {itemList.map((plant, index) => (
          <div key={index} className='card'>
            <div className='container'>
              <img src={plant.img} alt={plant.name} />
              <h3><b>{plant.name}</b></h3>
              <p>Maintenance Level: {plant.maintenanceLvl}</p>
              <p>Price: {plant.price}</p>
              <p>Rating: {plant.rating}</p>
            </div>
          </div>
        ))}
        {itemList.map((plant, index) => (
          <div key={index} className='card'>
            <div className='container'>
              <img src={plant.img} alt={plant.name} />
              <h3><b>{plant.name}</b></h3>
              <p>Maintenance Level: {plant.maintenanceLvl}</p>
              <p>Price: {plant.price}</p>
              <p>Rating: {plant.rating}</p>
            </div>
          </div>
        ))}
      </div>


      <Link to="/add">
        <button className="add-button">Add Plant</button>
      </Link>
    </>
  );
}

export default Home;