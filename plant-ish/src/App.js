import NavBar from './components/NavBar/NavBar';
import Home from './components/Homepage/Home';
import About from './components/About/About';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
