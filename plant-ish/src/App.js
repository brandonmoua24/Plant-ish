import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Homepage/Home';
import About from './components/About/About';
import Registration from './components/Registration/Registration';
import LogIn from './components/LogIn/LogIn';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Axios } from 'axios';
import AddItem from './components/AddItem/AddItem';
import ItemList from './components/AddItem/ItemList';


function App() {
  const [itemList, setItemList] = useState([
    {
      name: 'Chinese Money Plant',
      maintenanceLvl: 'Easy',
      price: '$$',
      rating: 4.5,
      img: 'https://s3-alpha-sig.figma.com/img/7b8e/28a4/b6b2b8dc01f1149f2584dfa9caeeb2d3?Expires=1701043200&Signature=Jbp8m7D3q0AyvdX0vttDnzi52JQN34VL2462~oCPAXUugLOX6l89LKhNDXhwYLZw6luqMJAWzHPOuUe3~CUTRuP5WAWITcXD2IaiBAnvNUQfozBaN4F3Bzmtw8ZKJp1sEKZOshQgjvBWizknlvYfgUAx1wXSXyVi3QAHN6yCOZDzIdiyqbyR4JMzsfCijoYxuyblTpIUQbkkNX0iFaVaT~ElnZ8T9vKKaGYNoNBDiqEb5swvVyPrRoPQcOtTv744tHwXO7~hYB5bBHLmdJizIfdbYXo98iWDoyVqmxQlHkyLPfPbHqwKZsF3nIk2H7JAMscnEFPuBmZySO3y5VBrrQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    }
    // {
    //   name: 'Plant 2',
    //   maintenanceLvl: 'Medium',
    //   price: '$30',
    //   rating: 3.8,
    //   img: 'plant2.jpg',
    // },
    // {
    //   name: 'Plant 3',
    //   maintenanceLvl: 'High',
    //   price: '$50',
    //   rating: 4.2,
    //   img: 'plant3.jpg',
    // },
  ]);

  const addItemHandler = (itemData) => {
    setItemList((prevItemList) => [...prevItemList, itemData]);
  };

  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home itemList={itemList} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/add" element={<AddItem onAddItem={addItemHandler} />} /> {/* New route for adding plants */}

         
        </Routes>
        
   
   
        
    </div>
  </Router>
  );
}

export default App;
