import React from 'react';
import Item from './Item';
import Card from './Card';

const ItemList = (props) => {
    return (
      <Card className= "plants" >
    <ul>
      {props.plants.map((plant) => ( //map generates the list dynamically 
          <Item
              //key tell react which array item each component corresponds to 
          key={plant.id} 
          img={plant.img}
          name={plant.name}
          maintenanceLvl={plant.maintenanceLvl}
        price={plant.price}
        rating={plant.rating}
              
              
        />
      ))}
    </ul>
    </Card>
  );
};

export default ItemList;