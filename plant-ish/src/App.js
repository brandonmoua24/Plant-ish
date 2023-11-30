import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Homepage/Home';
import About from './components/About/About';
import Registration from './components/Registration/Registration';
import LogIn from './components/LogIn/LogIn';
import UserHomePage from './components/UserHomePage/UserHomePage';
import UserProfile from './components/UserProfile/UserProfile';
import AddPlant from './components/UserHomePage/AddPlant';
import EditPlant from './components/UserHomePage/EditPlant';
import PlantInfo from './components/UserHomePage/PlantInfo';
import HomePlantInfo from './components/Homepage/HomePlantInfo';
import { useAuth } from './components/LogIn/AuthProvider';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';


function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/homeplantinfo/:id" element={<HomePlantInfo />} />
          <Route
            path="/userhomepage"
            element={auth ? <UserHomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/userprofile"
            element={auth ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/addplant"
            element={auth ? <AddPlant /> : <Navigate to="/login" />}
          />
          <Route
            path="/editplant/:id"
            element={auth ? <EditPlant /> : <Navigate to="/login" />}
          />
          <Route
            path="/plantinfo/:id"
            element={auth ? <PlantInfo /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
