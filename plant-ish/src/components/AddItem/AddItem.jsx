import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import './AddItem.css';

const AddItem = (props) => {
  const [plantData, setPlantData] = useState({
    name: '',
    maintenanceLvl: '',
    price: '',
    rating: '',
    img: '',
  });

  const { name, maintenanceLvl, price, rating, img } = plantData;

  const inputChangeHandler = (event) => {
    const { id, value } = event.target;

    if (id == 'rating') {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 5) {
            setPlantData((prevplantData) => ({
                ...prevplantData,
                [id]: parsedValue,
            }));
        }
    } else {
        setPlantData((prevplantData) => ({
            ...prevplantData,
            [id]: value,
          }));
        };
    }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert('Please enter a plant name before adding the plant.');
      return;
    }

    const newUser = {
      id: Math.random().toString(),
      name: name,
      maintenanceLvl: maintenanceLvl,
      price: price,
      rating: rating,
      img: img,
    };

    props.onAddUser(newUser);

    setPlantData
({
      name: '',
      maintenanceLvl: '',
      price: '',
      rating: '',
      img: '',
    });
  };

  return (
    <Card className="input">
      <form onSubmit={submitHandler}>
        <label>Plant Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={inputChangeHandler}
          placeholder="Enter the name of the plant"
        />
        <label>Maintenance Level</label>
        <select
          id="maintenanceLvl"
          value={maintenanceLvl}
          onChange={inputChangeHandler}
        >
          <option value="" disabled hidden>Select maintenance level</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Difficult">Difficult</option>
        </select>
        <label>Price</label>
         <input
          id="price"
          type="number"
          value={price}
          onChange={inputChangeHandler}
          placeholder="$-$$$$"
        />
        <label>Rating</label>
         <input
          id="rating"
          type="text"
          value={rating}
          onChange={inputChangeHandler}
          placeholder="Enter a rating integer between 1 and 5"
        />
        <label>Plant Image</label>
         <input
          id="img"
          type="text"
          value={img}
          onChange={inputChangeHandler}
          placeholder="Link to image"
        />
        <Button type="submit">Add Plant</Button>
      </form>
    </Card>
  );
};

export default AddItem;
