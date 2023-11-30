import React, { useEffect, useState } from "react";
import { useAuth } from '../LogIn/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserHomePage.css';

const UserHomePage = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth && auth.accessToken;

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
            <div className="header">Keep track of your plants!</div>

            <div className="pageinfo">
                You can create, edit, and remove your list of plants. Don’t worry, they will be here when you get back!
            </div>

            <div className="search-tools">
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

            <div className="user-body">
                <ul className="user-plants-container">
                    {plants.map((plant) => (
                        <li key={plant._id} className="user-plant-card">
                            <img className="plant-info-img" src={plant.imageUrl} alt={plant.name} />
                            <div className="user-plant-details">
                                {plant.name}<br />

                                {/*
                                <strong>Description:</strong> {plant.description}<br />
                                <strong>Maintenance Level:</strong> {plant.maintenancelvl}<br />
                                <strong>Rating:</strong> {plant.rating}<br />
                                <strong>Price:</strong> ${plant.price}<br />
                                 */}
                                
                                <Link to={`/plantinfo/${plant._id}`}><button className="editButton">Plant Info</button></Link>
                                <Link to={`/editplant/${plant._id}`}>
                                    <button className="editButton">Edit</button>
                                </Link>
                                <button className="deleteButton" onClick={() => handleDeletePlant(plant._id)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                    
                    <Link to="/addplant">
                    <button className="add-plant-button"> + </button>
                    </Link>
                </ul>
            </div>
        </>
    );
};

export default UserHomePage;
