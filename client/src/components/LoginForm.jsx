import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (email.length < 9 || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
            newErrors.email = 'Enter a valid email address';
        }

        if (password.length < 8) {
            newErrors.password = 'Password should be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;
    
        try {
            const response = await axios.post('http://localhost:8000/auth/login', { email, password }, { withCredentials: true });
            console.log(response.data);
            onLoginSuccess();
        } catch (err) {
            setErrors({ ...errors, form: err.response?.data?.error || 'Something went wrong' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>

            {errors.form && <p style={{color: 'red'}}>{errors.form}</p>}
            <button type="submit">Log In</button>
        </form>
    );
};

LoginForm.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired, 
};

export default LoginForm;

