import React from 'react';
import './Item.css';

const Item = props => {
    return (    
        <li key={props.id} className="plant-item">
        <img src={props.img} className="plant-img" alt={props.name} />
        <div className="plant-info">
            <h2>{props.name}</h2>
            <h3>{props.maintenanceLvl}</h3>
                <h3 className="plant-content">{props.price}</h3>
                <h3 className="plant-content">{props.rating}</h3>
        </div>
        </li>
    )
}

export default Item;