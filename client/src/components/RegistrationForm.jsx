import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Added useNavigate hook

const RegistrationForm = ({ onRegistrationSuccess }) => {
    const navigate = useNavigate(); // Hook for navigation
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        pronouns: '',
        membershipType: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {...errors}; // Start with existing errors

        // Validation checks
        if (user.firstName.length < 2) {
            newErrors.firstName = 'First name should be at least 2 characters';
        }

        if (user.lastName.length < 2) {
            newErrors.lastName = 'Last name should be at least 2 characters';
        }

        if (!newErrors.email && (user.email.length < 9 || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(user.email))) {
            newErrors.email = 'Enter a valid email address';
        }

        if (user.password.length < 8) {
            newErrors.password = 'Password should be at least 8 characters';
        }

        if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!user.pronouns) {
            newErrors.pronouns = 'Pronouns are required';
        }

        if (!user.membershipType) {
            newErrors.membershipType = 'Membership type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:8000/auth/register', user);
            console.log(response.data);
            setUser({ // Reset user state
                firstName: '',
                lastName: '',
                pronouns: '',
                membershipType: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            onRegistrationSuccess(); // Signal successful registration
            navigate('/'); // Redirect to login page
        } catch (err) {
            setErrors({ ...errors, form: err.response?.data?.error || 'Something went wrong' });
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <form className="reglogin-form" onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
            </div>
            <div>
                <label>Pronouns</label>
                <select name="pronouns" value={user.pronouns} onChange={handleChange}>
                    <option value="">Select Pronouns</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="They/Them">They/Them</option>
                </select>
                {errors.pronouns && <p style={{ color: 'red' }}>{errors.pronouns}</p>}
            </div>
            <div>
                <label>Membership Type</label>
                <div className="radio-options">
                    <input type="radio" name="membershipType" value="LGBTQIA+" onChange={handleChange} /> LGBTQIA+
                    <input type="radio" name="membershipType" value="Ally" onChange={handleChange} /> Ally
                </div>
                {errors.membershipType && <p style={{ color: 'red' }}>{errors.membershipType}</p>}
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            </div>
            {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

RegistrationForm.propTypes = {
    onRegistrationSuccess: PropTypes.func
};

export default RegistrationForm;

