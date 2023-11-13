import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import RegLoginPage from './pages/RegLoginPage';
import DetailsPage from './pages/DetailsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegLoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
