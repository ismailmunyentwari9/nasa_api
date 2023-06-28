import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import Home from './components/home';
import DayPicture from './components/daypicture';
import Media from './components/medias';
import './App.css';

const App = () => (
  <Router>
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/daypicture" className="nav-link">Day Picture</Link>
        </li>
        <li className="nav-item">
          <Link to="/media" className="nav-link">Media</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/daypicture" element={<DayPicture />} />
      <Route path="/media" element={<Media />} />
    </Routes>
  </Router>
);

export default App;
