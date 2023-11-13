import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/auth/logout', { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error.response?.data?.error || error.message);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Pride Journey</span>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
