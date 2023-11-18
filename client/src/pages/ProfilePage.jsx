import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './AllCss.css';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    const colorClasses = ['pastel-red', 'pastel-orange', 'pastel-yellow', 'pastel-green', 'pastel-blue', 'pastel-indigo', 'pastel-violet'];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/profile', { withCredentials: true });
            setUser(response.data.user);
            setSubmissions(response.data.submissions);
            setUpdatedUser(response.data.user);
        } catch (error) {
            console.error('Error fetching profile data', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put('http://localhost:8000/users/profile', updatedUser, { withCredentials: true });
            setEditMode(false);
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    return (
        <>
            <NavBar />
            <div className="container-profile">
                <h2>Welcome to Pride Journey</h2>
                <h3>Profile Page</h3>
                {!editMode ? (
                    <div className="profile-section">
                        <p className="profile-data pastel-red"> {user.firstName}</p>
                        <p className="profile-data pastel-orange">{user.lastName}</p>
                        <p className="profile-data pastel-green"> {user.pronouns}</p>
                        <p className="profile-data pastel-blue"> {user.membershipType}</p>
                        <div className="button-group">
                        <button className="profile-edit-button" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <form className="profileForm" onSubmit={handleUpdate}>
                            <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
                            <select name="pronouns" value={updatedUser.pronouns} onChange={handleChange}>
                                <option value="He/Him">He/Him</option>
                                <option value="She/Her">She/Her</option>
                                <option value="They/Them">They/Them</option>
                            </select>
                            <input type="radio" name="membershipType" value="LGBTQIA+" checked={updatedUser.membershipType === 'LGBTQIA+'} onChange={handleChange} /> LGBTQIA+
                            <input type="radio" name="membershipType" value="Ally" checked={updatedUser.membershipType === 'Ally'} onChange={handleChange} /> Ally
                            <div className="button-group">
                                <button className="profile-edit-button" onClick={handleUpdate}>Update</button>
                            </div>
                        </form>
                    </div>
                )}
                <h4>Your Submissions</h4>
                <div className="submission-list-container">
                    {submissions.map((submission, index) => (
                        <div className={`submission-card ${colorClasses[index % colorClasses.length]}`} key={submission._id}>
                            <h3>
                                <Link to={`/details/${submission._id}`}>
                                    {submission.name}
                                </Link>
                            </h3>
                            <p>{submission.city}, {submission.state}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

