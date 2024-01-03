import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import AllyCorner from './pages/AllyCorner';
import ProfilePage from './pages/ProfilePage';
import RegLoginPage from './pages/RegLoginPage';
import DetailsPage from './pages/DetailsPage';
import Footer from './components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegLoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/allycorner" element={<AllyCorner />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
