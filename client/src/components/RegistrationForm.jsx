import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const RegistrationForm = ({ onRegistrationSuccess }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        pronouns: '',
        membershipType: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/register', user);
            console.log(response.data);

            // Invoke onRegistrationSuccess after successful registration
            if (onRegistrationSuccess) {
                onRegistrationSuccess();
            }

            // Reset user state
            setUser({
                firstName: '',
                lastName: '',
                pronouns: '',
                membershipType: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required minLength={2} />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required minLength={2} />
            </div>
            <div>
                <label>Pronouns</label>
                <select name="pronouns" value={user.pronouns} onChange={handleChange} required>
                    <option value="">Select Pronouns</option>
                    <option value="He/Him">He/Him</option>
                    <option value="She/Her">She/Her</option>
                    <option value="They/Them">They/Them</option>
                </select>
            </div>
            <div>
                <label>Membership Type</label>
                <div>
                    <input type="radio" name="membershipType" value="LGBTQIA+" onChange={handleChange} required /> LGBTQIA+
                    <input type="radio" name="membershipType" value="Ally" onChange={handleChange} required /> Ally
                </div>
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required minLength={9} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} required minLength={8} />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required />
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

// Define PropTypes for RegistrationForm
RegistrationForm.propTypes = {
    onRegistrationSuccess: PropTypes.func
};

export default RegistrationForm;
