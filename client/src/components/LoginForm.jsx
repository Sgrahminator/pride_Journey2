import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post('http://localhost:8000/auth/login', { email, password }, { withCredentials: true });
            console.log(response.data);
            onLoginSuccess();
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required minLength={9} />
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
        <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </div>
        <button type="submit">Log In</button>
        </form>
    );
};

// Define prop types for LoginForm
LoginForm.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired, 
};

export default LoginForm;
