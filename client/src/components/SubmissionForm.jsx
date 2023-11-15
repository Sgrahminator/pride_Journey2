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

    const validate = () => {
        let newErrors = {};

        if (submission.name.length < 2) {
            newErrors.name = 'Name should be at least 2 characters';
        }
        if (submission.city.length < 2) {
            newErrors.city = 'City should be at least 2 characters';
        }
        if (submission.state.length < 2) {
            newErrors.state = 'State should be at least 2 characters';
        }
        if (submission.description.length < 10 || submission.description.length > 255) {
            newErrors.description = 'Description must be between 10 and 255 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await axios.post('http://localhost:8000/submissions', submission, { withCredentials: true });
            setSubmission({ name: '', city: '', state: '', description: '' });
            fetchSubmissions();
        } catch (error) {
            console.log(error); // line for debugging
            setErrors(error.response.data);
        }
    };

    const handleChange = (e) => {
        setSubmission({ ...submission, [e.target.name]: e.target.value });
        // Optionally clear errors for the field being edited
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
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
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

                {/* City Field */}
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={submission.city}
                    onChange={handleChange}
                />
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}

                {/* State Field */}
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={submission.state}
                    onChange={handleChange}
                />
                {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}

                {/* Description Field */}
                <input
                    type="text"
                    name="description"
                    placeholder="Short Description"
                    value={submission.description}
                    onChange={handleChange}
                />
                {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}

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

