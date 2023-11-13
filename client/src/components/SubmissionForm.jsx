import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SubmissionForm = ({ fetchSubmissions }) => {
    const [submission, setSubmission] = useState({
        name: '',
        city: '',
        state: '',
        description: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setSubmission({ ...submission, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/submissions', submission, { withCredentials: true });
            setSubmission({ name: '', city: '', state: '', description: '' });
            fetchSubmissions();
        } catch (error) {
            console.log(error); // Added this line for debugging
            setErrors(error.response.data);
        }
    };

    return (
        <div>
            <h2>Add New Submission</h2>
            <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <input
            type="text"
            name="name"
            placeholder="Name of Place or Event"
            value={submission.name}
            onChange={handleChange}
            />
            {errors.name && <p>{errors.name.message}</p>}

            {/* City Field */}
            <input
            type="text"
            name="city"
            placeholder="City"
            value={submission.city}
            onChange={handleChange}
            />
            {errors.city && <p>{errors.city.message}</p>}

            {/* State Field */}
            <input
            type="text"
            name="state"
            placeholder="State"
            value={submission.state}
            onChange={handleChange}
            />
            {errors.state && <p>{errors.state.message}</p>}

            {/* Description Field */}
            <textarea
            name="description"
            placeholder="Short Description"
            value={submission.description}
            onChange={handleChange}
            ></textarea>
            {errors.description && <p>{errors.description.message}</p>}

            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

// Define propTypes for SubmissionForm
SubmissionForm.propTypes = {
    fetchSubmissions: PropTypes.func.isRequired 
};

export default SubmissionForm;
