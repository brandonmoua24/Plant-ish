import React, { useEffect, useState } from "react";
import { useAuth } from '../LogIn/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserHomePage.css';

const UserHomePage = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth && auth.accessToken;

    const [plants, setPlants] = useState([]);
    //const userName = auth?.user?.name || '';

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

    useEffect(() => {
        document.body.className = isLoggedIn ? 'body-logged-in' : 'body-logged-out';

        return () => {
            document.body.className = '';
        };
    }, [isLoggedIn]);

    const handleDeletePlant = async (plantId) => {
        try {
            await axios.delete(`http://localhost:8008/api/plant/${plantId}`);
   
            setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== plantId));
        } catch (error) {
            console.error('Error deleting plant:', error.message);
        }
    };

    return (
        <>
        <div className='header'>
        Keep track of your plants!
      </div>
     
        <div className="pageinfo">You can create, edit, and remove your list of plants. Don’t worry, they will be here when you get back!
        <h3>Featured Plants:</h3>
        </div>
        <Link to="/addplant">
                    <button className="add-plant-button">Add Plant</button>
        </Link>
        <div className="user-body">
            <ul className="user-plants-container">
                {plants.map((plant) => (
                    <li key={plant._id} className="user-plant-card">
                        <img src={plant.imageUrl} alt={plant.name} />
                        <div className="user-plant-details">
                            <strong>Name:</strong> {plant.name}<br />
                            <strong>Description:</strong> {plant.description}<br />
                            <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
                            <strong>Rating:</strong> {plant.rating}<br />
                            <strong>Price:</strong> ${plant.price}<br />
                            
                            <Link to={`/editplant/${plant._id}`}>
                                  <button className="editButton">Edit</button>
                            </Link>
                            <button className="deleteButton" onClick={() => handleDeletePlant(plant._id)}>Remove</button>
                            
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </>
        
    );
};

export default UserHomePage;
