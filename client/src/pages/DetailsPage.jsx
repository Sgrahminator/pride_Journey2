import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [editableFields, setEditableFields] = useState({ name: '', city: '', state: '', description: '' });
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchSubmissionAndUser = async () => {
            try {
                const [submissionResponse, userResponse] = await Promise.all([
                    axios.get(`http://localhost:8000/submissions/${id}`, { withCredentials: true }),
                    axios.get('http://localhost:8000/users/profile', { withCredentials: true })
                ]);
                setSubmission(submissionResponse.data);
                setCurrentUser(userResponse.data.user);
                setEditableFields({
                    name: submissionResponse.data.name,
                    city: submissionResponse.data.city,
                    state: submissionResponse.data.state,
                    description: submissionResponse.data.description
                });
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchSubmissionAndUser();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8000/submissions/${id}`, editableFields, { withCredentials: true });
            navigate('/home');
        } catch (error) {
            console.error('Error updating submission', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            try {
                await axios.delete(`http://localhost:8000/submissions/${id}`, { withCredentials: true });
                navigate('/home');
            } catch (error) {
                console.error('Error deleting submission', error);
            }
        }
    };

    const handleChange = (e) => {
        setEditableFields({ ...editableFields, [e.target.name]: e.target.value });
    };

    const isOwner = currentUser && submission && currentUser._id === submission.user._id;

    const renderOwnerView = () => (
        <div>
            <input type="text" value={editableFields.name} onChange={handleChange} name="name" />
            <input type="text" value={editableFields.city} onChange={handleChange} name="city" />
            <input type="text" value={editableFields.state} onChange={handleChange} name="state" />
            <textarea value={editableFields.description} onChange={handleChange} name="description" />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );

    const renderVisitorView = () => (
        <div>
            <p>Name: {submission.name}</p>
            <p>City: {submission.city}</p>
            <p>State: {submission.state}</p>
            <p>Description: {submission.description}</p>
            <button onClick={() => navigate('/home')}>Back Home</button>
        </div>
    );

    if (!submission || !currentUser) return <div>Loading...</div>;

    return (
        <div>
            <h1>Submission Details</h1>
            {isOwner ? renderOwnerView() : renderVisitorView()}
        </div>
    );
};

export default DetailsPage;
