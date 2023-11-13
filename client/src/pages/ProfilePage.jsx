import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const navigate = useNavigate();

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

    const navigateToSubmission = (submissionId) => {
        navigate(`/details/:id/${submissionId}`);
    };

    return (
        <>
        <NavBar />
        
        <div>
            <h2>Welcome to Pride Journey</h2>
            <h3>Profile Page</h3>
            {!editMode ? (
                <div>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Pronouns: {user.pronouns}</p>
                    <p>Membership Type: {user.membershipType}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            ) : (
                <div>
                    <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} />
                    <select name="pronouns" value={updatedUser.pronouns} onChange={handleChange}>
                        <option value="He/Him">He/Him</option>
                        <option value="She/Her">She/Her</option>
                        <option value="They/Them">They/Them</option>
                    </select>
                    <input type="radio" name="membershipType" value="LGBTQIA+" checked={updatedUser.membershipType === 'LGBTQIA+'} onChange={handleChange} /> LGBTQIA+
                    <input type="radio" name="membershipType" value="Ally" checked={updatedUser.membershipType === 'Ally'} onChange={handleChange} /> Ally
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
            <h4>Your Submissions</h4>
            <ul>
                {submissions.map(submission => (
                    <li key={submission._id} onClick={() => navigateToSubmission(submission._id)}>
                        {submission.name} - {submission.city}, {submission.state}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default ProfilePage;
